// configuração do servidor
const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// cria instância de conexão com o banco
const cliente = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'fatec',
    database: 'api_visiona'
})

// função cadastrar usuário
function cadUser(name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat, res) {
    // consulta para inserir os valores dos parâmetros no banco
    const query = `INSERT INTO users ("name_user", "email", "password_user", "perfil", "cpf_user", "status_user",     
                    "createdat", "updatedat") 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    // array com os valores a serem inseridos
    const values = [name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat];

    // executa a consulta e retorna função callback
    cliente.query(query, values, (err, result) => {
        if (err) {
            console.log('Erro SQL:', err);
            res.send({ msg: 'Erro ao cadastrar usuário' });
        } else {
            res.send({ msg: 'Usuário cadastrado com sucesso' });
        }
    });
}

// função adicionar usuário
function addUser(name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat, res) {
    // consulta para inserir os valores dos parâmetros no banco
    const query = `INSERT INTO users ("name_user", "email", "password_user", "perfil", "cpf_user", "status_user", 
                    "createdat", "updatedat")
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    // array com os valores a serem inseridos
    const values = [name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat];

    // executa a consulta e retorna função callback
    cliente.query(query, values, (err, result) => {
        // retorna erro ou mensagem de sucesso
        if (err) {
            console.error('Erro SQL:', err);
            res.send({ msg: 'Erro ao adicionar usuário' });
        } else {
            res.send({ msg: 'Usuário adicionado com sucesso' });
        }
    });
}

// rota deletar usuário
app.delete("/usuarios/:id", (req, res) => {
    // deleta usuário com base no id, que é armazenado na variável abaixo
    const id = req.params.id;

    // faz a consulta no banco e deleta o usuário com o campo 'id_user' correspondente a variável id
    cliente.query("DELETE FROM users WHERE id_user = $1", [id], (err, result) => {
        // retorna erro ou mensagem de sucesso
        if (err) {
            console.log("erro SQL", err);
            res.status(500).send({ msg: "Erro ao excluir usuário" });
        } else {
            res.send({ msg: "Usuário excluído com sucesso" });
        }
    });
});

// função login
function logUser(email, password_user, res) {
    // executa consulta SQL e seleciona usuário onde campos 'email' e 'password_user' são iguais aos recebidos
    cliente.query("SELECT * FROM users WHERE email = '" + email + "' AND password_user = '" + password_user + "' ;", (err, result) => {
        if (err) {
            // retorna erro
            console.log('erro query:', err);
        }
        // se a linha encontrada for igual a 1 (ou seja, se o usuário existir)...
        if (result.rows.length === 1) {
            // armazena os dados do usuário no objeto 'data' e retorna seu valor, ou retorna erro
            const idUser = result.rows.values().next().value.id_user;
            const nomeUser = result.rows.values().next().value.name_user;
            const perfilUser = result.rows.values().next().value.perfil;
            const statusUser = result.rows.values().next().value.status_user;
            const senhaUser = result.rows.values().next().value.password_user;
            const mensagem = 'Usuário logado'
            const data = { msg: mensagem, id_user: idUser, name_user: nomeUser, perfil: perfilUser, status_user: statusUser, password_user: senhaUser }
            res.send(data)
        } else {
            res.send({ msg: "Usuário não cadastrado/Informações estão incorretas" })
        }
    })
}

// função editar usuário
function updtUser(name_user, email, id_user, updatedat, status_user, res) {
    // executa a consulta SQL e atualiza os valores dos campos definidos
    cliente.query("UPDATE users SET name_user = '" + name_user + "', email = '" + email + "', updatedat = '" + updatedat + "', status_user = '" + status_user + "' WHERE id_user = " + id_user + ";", (err, result) => {
        // retorna erro ou mensagem de sucesso
        if (err) {
            console.log("erro SQL", err);
        } else {
            res.send({ msg: "Usuário atualizado" })
        };
    });
}

// função alterar senha
function alteraSenha(id_user, updatedat, password_user, email, res) {
    // executa a consula SQL e atualiza o campo 'password_user' com um novo valor
    console.log(id_user, updatedat, password_user, email)
    if (!email) {
        cliente.query(`UPDATE users SET password_user = '${password_user}', updatedat = '${updatedat}' WHERE id_user = '${id_user}';`, (err, result) => {
            // retorna erro ou mensagem de sucesso
            if (err) {
                console.log("erro SQL", err);
            } else {
                res.send({ msg: "Senha alterada" })
            };
        });

    } else {
        cliente.query(`UPDATE users SET password_user = '${password_user}', updatedat = '${updatedat}' WHERE email = '${email}';`, (err, result) => {
            // retorna erro ou mensagem de sucesso
            if (err) {
                console.log("erro SQL", err);
            } else {
                res.send({ msg: "Senha alterada" })
            };
        });
    }
}

// função preencher campos
function preencheCampos(id_user, res) {
    // executa a consulta SQL e seleciona todos os campos da tabela onde o 'id_user' seja igual ao valor recebido
    cliente.query("SELECT * FROM users WHERE id_user = " + id_user + ";", (err, result) => {
        if (err) {
            console.log("erro query: ", err);
        }
        // se a consulta retornar um registro, salva todas as informações do usuário buscado pelo id em 'data', senão retorna erro
        if (result.rows.length === 1) {
            const nomeUser = result.rows.values().next().value.name_user;
            const emailUser = result.rows.values().next().value.email;
            const cpfUser = result.rows.values().next().value.cpf_user;
            const perfilUser = result.rows.values().next().value.perfil;
            const senhaUser = result.rows.values().next().value.password_user;
            const mensagem = 'Usuário logado';
            const data = { msg: mensagem, name_user: nomeUser, email: emailUser, cpf_user: cpfUser, perfil: perfilUser, password_user: senhaUser }
            res.send(data);
        } else {
            res.send({ msg: '"Usuário não cadastrado/Informações estão incorretas"' })
        }
    })
}

app.use(cors()); // permite que o servidor Express responda a solicitações feitas a partir de diferentes origens

app.use(express.json()); // permite que o Express analise o corpo das solicitações recebidas e converta automaticamente o JSON em um objeto JavaScript acessível por meio do req.body

// rota login
app.post("/", (req, res) => {
    // extrai os dados enviados pelo cliente no corpo da requisição e os armazena
    const email = req.body.email
    const password_user = req.body.password_user

    // invoca a função de login e utiliza os valores da rota como argumentos
    logUser(email, password_user, res)
});

app.post("/esquecer", (req, res) => {
    const { email } = req.body;
    //1. fazer um find no banco utilizando email como referencia
    cliente.query("SELECT * FROM users WHERE email = '" + email + "' ;", async (err, result) => {
        if (err) {
            console.log('erro query:', err);
        }
        if (result.rows.length === 1) {
            const token = jwt.sign({ email }, 'SECRET', { expiresIn: '12h' })

            var transporter = nodemailer.createTransport({
                host: 'smtp.office365.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'visionafatec3ads@outlook.com',
                    pass: 'visiona123'
                }
            });

            let info = await transporter.sendMail({
                from: 'visionafatec3ads@outlook.com', // Substitua pelo seu email do Gmail
                to: email, // Substitua pelo email do destinatário
                subject: 'Recuperação de Senha',
                html: `<p>Olá ${email},</p>
                <p>Para trocar a senha, clique no link abaixo:</p>
                <p><a href="http://localhost:3000/alterarsenha/${token}">Trocar senha</a></p>`,
                //html: '<p>Conteúdo do email em formato HTML</p>',
            });

            console.log('Email enviado:', info.messageId);
            res.send({ msg: "Email enviado" })
        } else {
            console.log('usuario nao cadastrado')
            res.send({ msg: "Usuário não cadastrado/Informações estão incorretas" })
        }
    })
    //se nao tiver retorna como erro
    //se tiver usuario cria token com jwt
    //configurar o nodemailer (precisa de um email padrao pra enviar os emails)
    //enviar o email que conste uma url com esqueci minha senha, usuario, token e o token
    //

})

app.post("/validartoken", (req, res) => {
    const { token } = req.body;
    try {
        const payload = jwt.verify(token, 'SECRET');
        res.json(payload);
    } catch (error) {
        console.error('Erro ao validar o token:', error);
        res.json({ error: true, message: 'deu ruim irmao' })
    }
})
// rota cadastrar usuário
app.post("/cadastro", (req, res) => {
    // extrai os dados enviados pelo cliente no corpo da requisição e os armazena nas varíaveis correspondentes
    const { name_user } = req.body;
    const { email } = req.body;
    const { password_user } = req.body;
    const perfil = "Comum";
    const { cpf_user } = req.body;
    const status_user = "Ativo";
    const { createdat } = req.body;
    const { updatedat } = req.body
    // imprime o corpo da requisição no console
    console.log(req.body)

    // invoca a função de cadastrar usuário e utiliza os valores da rota como argumentos
    cadUser(name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat, res)
});

// rota adicionar usuário
app.post("/adicionar", (req, res) => {
    // extrai os dados enviados pelo cliente no corpo da requisição e os armazena nas varíaveis correspondentes
    const { name_user } = req.body;
    const { email } = req.body;
    const { password_user } = req.body;
    const { perfil } = req.body;
    const { cpf_user } = req.body;
    const status_user = "Ativo";
    const { createdat } = req.body;
    const { updatedat } = req.body
    // imprime o corpo da requisição no console
    console.log(req.body)

    // invoca a função de adicionar usuário e utiliza os valores da rota como argumentos
    addUser(name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat, res)
});

// rota preencher tabela
app.get("/mostrarTabela", (req, res) => {
    // acima define a requisição get, e abaixo consulta o banco e seleciona todos os usuários
    cliente.query('select id_user, name_user, email, perfil, status_user, createdat from users', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // retorna o resultado da consulta em formato json
            res.json(result.rows);
        }
    })
});

// rota editar perfil
app.post("/editar-perfil", (req, res) => {
    // extrai os dados enviados pelo cliente no corpo da requisição e os armazena nas varíaveis correspondentes
    const { name_user } = req.body;
    const { email } = req.body;
    const { id_user } = req.body;
    const { updatedat } = req.body;
    const { status_user } = req.body
    // imprime o corpo da requisição no console
    console.log(req.body)

    // invoca a função de atualizar usuário e utiliza os valores da rota como argumentos
    updtUser(name_user, email, id_user, updatedat, status_user, res);
});

// rota alterar senha
app.post("/alterar-senha", (req, res) => {
    // extrai os dados enviados pelo cliente no corpo da requisição e os armazena nas varíaveis correspondentes
    const { id_user } = req.body;
    const { email } = req.body;
    const { updatedat } = req.body;
    const { password_user } = req.body
    // imprime o corpo da requisição no console
    console.log(req.body)

    // invoca a função de alterar senha e utiliza os valores da rota como argumentos
    alteraSenha(id_user, updatedat, password_user, email, res);
});

// rota edita user
app.post('/editar', (req, res) => {
    // extrai o id do usuário do corpo da requisição e o armazena na variável correspondente
    const { id_user } = req.body

    // invoca a função de preencher campos e utiliza o valor da rota como argumento
    preencheCampos(id_user, res)
});

// rota dashboard (lista a quantidade de usuários ativos e inativos)
app.get("/usuarios/ativos-inativos", (req, res) => {
    // consulta o banco, conta a quantidade de usuários ativos, e nomeia o resultado como 'ativos'
    cliente.query("SELECT COUNT(*) AS ativos FROM users WHERE status_user = 'Ativo';", (err, resultAtivos) => {
        if (err) {
            console.log("erro SQL", err);
            res.status(500).send({ msg: "Erro ao obter a contagem de usuários ativos" });
        } else {
            // consulta o banco, conta a quantidade de usuários inativos, e nomeia o resultado como 'inativos'
            cliente.query("SELECT COUNT(*) AS inativos FROM users WHERE status_user = 'Inativo';", (err, resultInativos) => {
                if (err) {
                    console.log("erro SQL", err);
                    res.status(500).send({ msg: "Erro ao obter a contagem de usuários inativos" });
                } else {
                    // valores das contagens são extraídos dos resultados das consultas e armazenados nas variáveis
                    const ativos = resultAtivos.rows[0].ativos;
                    const inativos = resultInativos.rows[0].inativos;
                    // um objeto 'data' é criado contendo essas variáveis, e é enviado como resposta
                    const data = { ativos: ativos, inativos: inativos }
                    res.send(data);
                }
            });
        }
    });
});

// rota dashboard (lista a quantidade de usuários comuns e admins)
app.get("/usuarios/comum-admin", (req, res) => {
    // consulta o banco, conta a quantidade de usuários comuns, e nomeia o resultado como 'comuns'
    cliente.query("SELECT COUNT(*) AS comuns FROM users WHERE perfil = 'Comum';", (err, resultComuns) => {
        if (err) {
            console.log("erro SQL", err);
            res.status(500).send({ msg: "Erro ao obter a contagem de usuários comuns" });
        } else {
            // consulta o banco, conta a quantidade de usuários admins, e nomeia o resultado como 'admins'
            cliente.query("SELECT COUNT(*) AS admins FROM users WHERE perfil = 'Admin';", (err, resultAdmins) => {
                if (err) {
                    console.log("erro SQL", err);
                    res.status(500).send({ msg: "Erro ao obter a contagem de usuários admins" });
                } else {
                    // valores das contagens são extraídos dos resultados das consultas e armazenados nas variáveis
                    const comuns = resultComuns.rows[0].comuns;
                    const admins = resultAdmins.rows[0].admins;
                    // um objeto 'data' é criado contendo essas variáveis, e é enviado como resposta
                    const data = { comuns: comuns, admins: admins }
                    res.send(data);
                }
            });
        }
    });
});

// rota contagem de emails
app.get("/usuarios/emails", (req, res) => {
    // consulta o banco e seleciona todos os valores dos campos 'email'
    cliente.query("SELECT email FROM users;", (err, result) => {
        if (err) {
            console.log("erro SQL", err);
            res.status(500).send({ msg: "Erro ao obter os emails dos usuários" });
        } else {
            // Extrai os emails dos resultados da consulta
            const emails = result.rows.map(row => row.email);
            // Envia os emails como resposta
            res.send(emails);
        }
    });
});

// rota contagem de cpfs
app.get("/usuarios/cpfs", (req, res) => {
    // consulta o banco e seleciona todos os valores dos campos 'email'
    cliente.query("SELECT cpf_user FROM users;", (err, result) => {
        if (err) {
            console.log("erro SQL", err);
            res.status(500).send({ msg: "Erro ao obter os cpfs dos usuários" });
        } else {
            // Extrai os cpfs dos resultados da consulta
            const cpfs = result.rows.map(row => row.cpf_user);
            // Envia os cpfs como resposta
            res.send(cpfs);
        }
    });
});

// testa o servidor
app.listen(3001, () => {
    console.log("Servidor sendo executado");
});