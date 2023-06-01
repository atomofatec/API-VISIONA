import React from 'react';
import Style from '../../Styles/Paginacao.module.css'

const Paginacao = ({ totalUsuarios, usuariosPorPagina, paginaAtual, onPageChange }) => {
  const totalPages = Math.ceil(totalUsuarios / usuariosPorPagina);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={Style.pagination}>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={`page-item ${paginaAtual === pageNumber ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginacao;