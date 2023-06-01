import React, { useEffect, useState } from 'react';
import Style from '../Styles/Grafico.module.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

export function GraficoAdm() {
  const [dados, setDados] = useState({ comuns: 0, admins: 0 });

  useEffect(() => {
    axios.get('http://localhost:3001/usuarios/comum-admin')
      .then(response => {
        const { comuns, admins } = response.data;
        setDados({ comuns: parseInt(comuns), admins: parseInt(admins) });
      })
      .catch(error => {
        console.log('Erro ao obter os dados do servidor', error);
      });
  }, []);

  const seriesData = [];

  if (dados.comuns > 0) {
    seriesData.push({
      name: 'Comuns',
      y: dados.comuns,
      sliced: true,
      selected: true,
      color: '#f5ab00'
    });
  }
  
  if (dados.admins > 0) {
    seriesData.push({
      name: 'Administradores',
      color: '#E76100',
      y: dados.admins
    });
  }

  const options = {
    chart: {
      type: 'pie',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: ''
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}',
          style: {
            fontSize: '18px',
            color: '#000000',
            whiteSpace: 'nowrap'
          }
        },
        size: '90%'
      }
    },
    tooltip: {
      formatter: function() {
        return this.point.name + ': ' + this.point.y;
      }
    },
    series: [
      {
        data: seriesData
      }
    ]
  };

  return (
    <div className={Style.container}>
      <div className={Style.testeText}>
        Usuários comuns / Administradores
      </div>
      <div className={Style.legendContainer}>
        <div className={Style.legendItem}>
          <div className={Style.legendSquare3}></div>
          <div className="legendText">Usuários comuns</div>
        </div>
        <div className={Style.legendItem2}>
          <div className={Style.legendSquare4}></div>
          <div className="legendText">Administradores</div>
        </div>
      </div>
      <div className="graficoContainer">
        <div className={Style.chartWrapper}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </div>
  );
}
