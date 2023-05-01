const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors")

const cliente = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'fatec',
    database: 'api_visiona'
})

function cadUser(name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat, res){
    cliente.query(('insert into users ("name_user", "email", "password_user", "perfil", "cpf_user", "status_user", "createdat", "updatedat") values ('+"'"+name_user+"', '"+email+"', '"+password_user+"', '"+perfil+"', '"+cpf_user+"', '"+status_user+"', '"+createdat+"', '"+updatedat+"');"), (err, result) => {
        if(err) {
            console.log('erro SQL', err);
        } else {
            res.send({msg: "Usuário cadastrado com sucesso"})
        };
    })
}

function addUser(name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat, res){
    cliente.query(('insert into users ("name_user", "email", "password_user", "perfil", "cpf_user", "status_user", "createdat", "updatedat") values ('+"'"+name_user+"', '"+email+"', '"+password_user+"', '"+perfil+"', '"+cpf_user+"', '"+status_user+"', '"+createdat+"', '"+updatedat+"');"), (err, result) => {
        if(err) {
            console.log('erro SQL', err);
        } else {
            res.send({msg: "Usuário adicionado com sucesso"})
        };
    })
}

function logUser(email, password_user, res) {
    cliente.query("SELECT * FROM users WHERE email = '"+email+"' AND password_user = '"+password_user+"' ;", (err, result) => {
        if(err) {
            console.log('erro query:', err);
        }
        if(result.rows.length > 0) {
            res.send({msg: "Usuário logado"})
        } else {
            res.send({msg: "Usuário não cadastrado/Informações estão incorretas"})
        }
    })
}

  function attUser(name_user, email, id_user, updatedat, res) {
    cliente.query(
        "UPDATE users SET name_user = '" 
        + name_user + 
        "', email = '" 
        + email +   
        "', updatedat = '" 
        + updatedat +   
        "' WHERE id_user = " 
        + id_user + 
        ";"
    , (err, result) => {
        if(err) {
            console.log("erro SQL", err);
        } else {
            res.send({msg: "Usuário atualizado"})
        };
    });
  }

  function preencheCampos(id_user, res) {
    cliente.query("SELECT * FROM users WHERE id_user = "+ id_user + ";", (err, result) => {
        if(err) {
            console.log("erro query: ", err);
        }
        if(result.rows.length === 1) {
            const nomeUser = result.rows.values().next().value.name_user;
            const emailUser = result.rows.values().next().value.email;
            const cpfUser = result.rows.values().next().value.cpf_user;
            const mensagem = 'Usuário logado';
            const pessoa = {msg:mensagem, name_user:nomeUser, email:emailUser, cpf_user:cpfUser}
            res.send(pessoa);
        }else{
            res.send({msg: '"Usuário não cadastrado/Informações estão incorretas"'})
        }
    })
  }

app.use(cors());
app.use(express.json());

app.post("/", (req, res) => {
    const email = req.body.email
    const password_user = req.body.password_user

    logUser(email, password_user, res)
})

app.post("/cadastro", (req, res)=>{
    const {name_user} = req.body;
    const {email} = req.body;
    const {password_user} = req.body;
    const perfil = "Comum";
    const {cpf_user} = req.body;
    const status_user = "Ativo";
    const {createdat} = req.body;
    const {updatedat} = req.body

    cadUser(name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat, res)
    
})

app.post("/adicionar", (req, res)=>{
    const {name_user} = req.body;
    const {email} = req.body;
    const {password_user} = req.body;
    const perfil = "Comum";
    const {cpf_user} = req.body;
    const status_user = "Ativo";
    const {createdat} = req.body;
    const {updatedat} = req.body

    addUser(name_user, email, password_user, perfil, cpf_user, status_user, createdat, updatedat, res)
    
})

app.get("/mostrarTabela", (req, res)=>{

    cliente.query('select id_user, name_user, email, perfil, status_user, createdat from users', (err, result)=>{
        if(err) console.log(err);
        else res.json(result.rows);
    })

})

app.post("/confirmar-editar", (req, res) => {
    const { name_user } = req.body;
    const { email } = req.body;
    const { id_user } = req.body;
    const { updatedat } = req.body;

    attUser(name_user, email, id_user, updatedat, res);
});

app.post('/editar', (req,res) => {
    const { id_user } = req.body
  
    preencheCampos(id_user, res)
  })

app.listen(3001, () => {
    console.log("Servidor sendo executado");
});