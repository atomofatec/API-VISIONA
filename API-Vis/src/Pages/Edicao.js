import CirculosPerfil from '../Components/CirculosPerfil';
import Logo from '../Components/Logo';
import Style from '../Styles/Edicao.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import SwitchButton from '../Components/SwitchButton';

export function Edicao() {
    const [getUserId] = useState([]);
    const [users, setUsers] = useState([]); 
    const [values, setValues] = useState();
    const navigate = useNavigate();

    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
          ...prevValue,
          [value.target.name]: value.target.value,
        }));
      };
    
    useEffect(() => {
        const tabelaDataJson = localStorage.getItem('tabelaUsers');
        const tabelaData = JSON.parse(tabelaDataJson);
        console.log(tabelaData);

        document.getElementById('nome').value = tabelaData.tabelaNome;
        document.getElementById('email').value = tabelaData.tabelaEmail;
    }, []);

    const handleClickButton = () => {
        const tabelaDataJson = localStorage.getItem('tabelaUsers');
        const tabelaData = JSON.parse(tabelaDataJson);
        const updatedat = new Date().toLocaleString();
        axios.post("http://localhost:3001/confirmar-editar", {
            name_user: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            id_user: tabelaData.tabelaId,
            updatedat: updatedat
        }).then((response) => {
            if(response.data.msg === "Usuário atualizado") {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'Alteração realizada',
                    confirmButtonColor: '#E76100',
                    showConfirmButton: false,
                    iconColor: '#E76100',
                    timer: 2000,
                    timerProgressBar: true,
                    showCloseButton: true,
                  })
                navigate('/tabela-users')
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Atenção',
                    text: 'Não foi possível editar o usuário',
                    confirmButtonColor: '#E76100',
                    showConfirmButton: false,
                    iconColor: '#E76100',
                    timer: 2000,
                    timerProgressBar: true,
                    showCloseButton: true,
                  })
            }
        })
    }

    const handleClickDeleteButton = async (id) => {
        const confirmDelete = window.confirm('Deseja realmente excluir o usuário?');
        if (confirmDelete) {
          try {
            await axios.delete(`http://localhost:3001/edicao`);
            setUsers(users.filter((user) => user.id !== id));
            alert('Usuário excluído com sucesso!');
          } catch (error) {
            alert('Não foi possível excluir o usuário');
          }
        }
      };

    //   const handleClickStatusButton = document.querySelector();
    //   switchButton.addEventListener('change', (event) => {
    //     const userId = getUserId();
    //     const isActive = event.target.checked;
      
    //     fetch(`/users/${userId}/activate`, {
    //       method: 'PATCH',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ is_active: isActive })
    //     })
    //       .then(response => response.json())
    //       .then(data => console.log(data))
    //       .catch(error => console.error(error));
    //   });
        
    
    return(
        <>
        <link
            href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
            rel="stylesheet"
        />
            <div className={Style.edicao_container}>
                <Logo />

                <div className={Style.edicao_align_field}>
                    <span>
                        <Link to="/tabela-users" className="btn">
                        <i className="bx bx-arrow-back"></i>
                        </Link>
                        <p className={Style.edicao_p}>
                            Editar Usuário
                        </p>
                    </span>

                    <div className={Style.edicao_login_form}>
                        <div className={Style.edicao_adicionar_htm}>   
                            <div className={Style.edicao_group}>
                                <input placeholder="Nome"
                                    id="nome" 
                                    type="nome" 
                                    name='nome'
                                    className={Style.edicao_input}
                                    onChange={handleChangeValues} />
                            </div>
                            <div className={Style.edicao_group}>
                                <input placeholder="E-mail" 
                                    id="email" 
                                    type="email"
                                    name='email' 
                                    className={Style.edicao_input}
                                    onChange={handleChangeValues} />
                            </div>                      
                        </div>
                        <div>
                            <span>
                                <p className={Style.t1}>
                                Status:
                                </p>
                            </span>
                        </div>
                        <div className={Style.edicao_group}>
                            <SwitchButton />
                            {/* onClick={()=>handleClickStatusButton()} */}
                        </div>
                        <div className={Style.edicao_group}> 
                            <button type="button" className={Style.edicao_button} onClick={()=>handleClickButton()}>
                                Editar
                            </button>
                        </div>
                        <div className={Style.edicao_group}> 
                            <button type="button" className={Style.excluir_button} onClick={()=>handleClickDeleteButton()}>
                                Excluir
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
            <CirculosPerfil />
        </>
    );
}