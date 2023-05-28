const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");
//const session = require("express-session");
//const cookieParser = require("cookie-parser")

const cliente = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'fatec',
    database: 'api_visiona'
})

//Função cadastro
function cadUser(name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat, res) {
    const query =   `INSERT INTO users ("name_user", "email", "password_user", "perfil", "cpf_user", "status_user",     
                    "createdat", "updatedat") 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    const values = [name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat];
  
    cliente.query(query, values, (err, result) => {
        if (err) {
            console.log('Erro SQL:', err);
            res.send({ msg: 'Erro ao cadastrar usuário' });
        } else {
            res.send({ msg: 'Usuário cadastrado com sucesso' });
        }
    });
}

//Função adiciona user
function addUser(name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat, res) {
    const query =   `INSERT INTO users ("name_user", "email", "password_user", "perfil", "cpf_user", "status_user", 
                    "createdat", "updatedat")
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    const values = [name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat];
  
    cliente.query(query, values, (err, result) => {
      if (err) {
        console.error('Erro SQL:', err);
        res.send({ msg: 'Erro ao adicionar usuário' });
      } else {
        res.send({ msg: 'Usuário adicionado com sucesso' });
      }
    });
}

//Rota deleta user
app.delete("/usuarios/:id", (req, res) => {
    const id = req.params.id;
  
    cliente.query("DELETE FROM users WHERE id_user = $1", [id], (err, result) => {
        if (err) {
            console.log("erro SQL", err);
            res.status(500).send({ msg: "Erro ao excluir usuário" });
        } else {
            res.send({ msg: "Usuário excluído com sucesso" });
        }
    });
});

//Função login
function logUser(email, password_user, res) {
    cliente.query("SELECT * FROM users WHERE email = '"+email+"' AND password_user = '"+password_user+"' ;", (err, result) => {
        if(err) {
            console.log('erro query:', err);
        }
        if (result.rows.length === 1) {
            const idUser = result.rows.values().next().value.id_user
            const perfilUser = result.rows.values().next().value.perfil;
            const statusUser = result.rows.values().next().value.status_user;
            const senhaUser = result.rows.values().next().value.password_user;
            if(result.rows.length > 0) {
                const mensagem = 'Usuário logado'
                const data = {msg: mensagem, id_user:idUser, perfil:perfilUser, status_user:statusUser, password_user:senhaUser}
                res.send(data)
            } else {
                res.send({msg: "Usuário não cadastrado/Informações estão incorretas"})
            }
        } else {
            res.send({msg: "Usuário não cadastrado/Informações estão incorretas"})
        }
    })
}

//Função atualiza user
function updtUser(name_user, email, id_user, updatedat, status_user, res) {
    cliente.query("UPDATE users SET name_user = '"+ name_user +"', email = '"+ email +  "', updatedat = '"+ updatedat + "', status_user = '"+ status_user +"' WHERE id_user = "+ id_user +";", (err, result) => {
        if(err) {
            console.log("erro SQL", err);
        } else {
            res.send({msg: "Usuário atualizado"})
        };
    });
}

//Função altera senha
function alteraSenha(id_user, updatedat, password_user, res) {
    cliente.query("UPDATE users SET password_user = '"+ password_user +"', updatedat = '"+ updatedat + "' WHERE id_user = "+ id_user +";", (err, result) => {
        if(err) {
            console.log("erro SQL", err);
        } else {
            res.send({msg: "Senha alterada"})
        };
    });
}

//Função preenche campos
function preencheCampos(id_user, res) {
    cliente.query("SELECT * FROM users WHERE id_user = "+ id_user + ";", (err, result) => {
        if(err) {
            console.log("erro query: ", err);
        }
        if(result.rows.length === 1) {
            const nomeUser = result.rows.values().next().value.name_user;
            const emailUser = result.rows.values().next().value.email;
            const cpfUser = result.rows.values().next().value.cpf_user;
            const perfilUser = result.rows.values().next().value.perfil;
            const senhaUser = result.rows.values().next().value.password_user;
            const mensagem = 'Usuário logado';
            const data = {msg:mensagem, name_user:nomeUser, email:emailUser, cpf_user:cpfUser, perfil:perfilUser, password_user:senhaUser}
            res.send(data);
        } else {
            res.send({msg: '"Usuário não cadastrado/Informações estão incorretas"'})
        }
    })
}

app.use(cors());
app.use(express.json());
/*app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret"
}));*/

//Rota login
app.post("/", (req, res) => {
    const email = req.body.email
    const password_user = req.body.password_user

    logUser(email, password_user, res)
});

/*    cliente.query(`select * from users where email = '${email}'`, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0])
            const user_session = {
                id: res.rows[0].id_user,
                name : res.rows[0].name_user,
                email: res.rows[0].email,
                password_user: res.rows[0].password_user,
                perfil: res.rows[0].perfil,
                cpf: res.rows[0].cpf_user,
                status: res.rows[0].status_user,
                updated: res.rows[0].updatedat
            }
            console.log(user_session)
            req.session.user = user_session;
            req.session.save();
        }
    })
})

 app.get("/user", (req, res) => {
    const sessionUser = req.session.user;
    return res.send(sessionUser);
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    return res.send("User logged out!"); 
}); */

//Rota cadastro
app.post("/cadastro", (req, res) => {
    const {name_user} = req.body;
    const {email} = req.body;
    const {password_user} = req.body;
    const perfil = "Comum";
    const {cpf_user} = req.body;
    const status_user = "Ativo";
    const {createdat} = req.body;
    const {updatedat} = req.body
    console.log(req.body)
    cadUser(name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat, res)    
});

//Rota adiciona user
app.post("/adicionar", (req, res) => {
    const {name_user} = req.body;
    const {email} = req.body;
    const {password_user} = req.body;
    const {perfil} = req.body;
    const {cpf_user} = req.body;
    const status_user = "Ativo";
    const {createdat} = req.body;
    const {updatedat} = req.body

    addUser(name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat, res)    
});

//Rota preenche tabela
app.get("/mostrarTabela", (req, res) => {
    cliente.query('select id_user, name_user, email, perfil, status_user, createdat from users', (err, result)=>{
        if(err) console.log(err);
        else res.json(result.rows);
    })
});

//Rota edita perfil
app.post("/editar-perfil", (req, res) => {
    const { name_user } = req.body;
    const { email } = req.body;
    const { id_user } = req.body;
    const { updatedat } = req.body;
    const { status_user } = req.body

    updtUser(name_user, email, id_user, updatedat, status_user, res);
});

//Rota altera senha
app.post("/alterar-senha", (req, res) => {
    const { id_user } = req.body;
    const { updatedat } = req.body;
    const { password_user } = req.body

    alteraSenha(id_user, updatedat, password_user, res);
});

//Rota edita user
app.post('/editar', (req,res) => {
    const { id_user } = req.body
  
    preencheCampos(id_user, res)
});

//Rota dashboard (lista quantidade de ativos e inativos)
app.get("/usuarios/ativos-inativos", (req, res) => {
    cliente.query("SELECT COUNT(*) AS ativos FROM users WHERE status_user = 'Ativo';", (err, resultAtivos) => {
        if (err) {
            console.log("erro SQL", err);
            res.status(500).send({ msg: "Erro ao obter a contagem de usuários ativos" });
        } else {
            cliente.query("SELECT COUNT(*) AS inativos FROM users WHERE status_user = 'Inativo';", (err, resultInativos) => {
                if (err) {
                    console.log("erro SQL", err);
                    res.status(500).send({ msg: "Erro ao obter a contagem de usuários inativos" });
                } else {
                    const ativos = resultAtivos.rows[0].ativos;
                    const inativos = resultInativos.rows[0].inativos;
                    const data = {ativos: ativos, inativos: inativos}
                    res.send(data);
                }
            });
        }
    });
});

//Testa o servidor
app.listen(3001, () => {
    console.log("Servidor sendo executado");
});