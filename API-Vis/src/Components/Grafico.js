import React, { useEffect, useState } from 'react';
import Style from '../Styles/Grafico.module.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

export function Grafico() {
  const [dados, setDados] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3001/usuarios/ativos-inativos')
      .then(response => {
        const { ativos, inativos } = response.data;
        setDados({ ativos: parseInt(ativos), inativos: parseInt(inativos) });
      })
      .catch(error => {
        console.log('Erro ao obter os dados do servidor', error);
      });
  }, []);

  const seriesData = [];

  if (dados.ativos > 0) {
    seriesData.push({
      name: 'Ativos',
      y: dados.ativos,
      sliced: true,
      selected: true,
      color: '#ee8600',
      dataLabels: {
        enabled: false // Remover as etiquetas dos dados
      }
    });
  }

  if (dados.inativos > 0) {
    seriesData.push({
      name: 'Inativos',
      color: '#353a47',
      y: dados.inativos,
      dataLabels: {
        enabled: false // Remover as etiquetas dos dados
      }
    });
  }

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: ''
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        size: '80%'
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
        Usuários ativos / inativos
      </div>
      <div className={Style.legendContainer}>
        <div className={Style.legendItem}>
          <div className={Style.legendSquare2}></div>
          <div className="legendText">Ativos</div>
        </div>
        <div className={Style.legendItem2}>
          <div className={Style.legendSquare}></div>
          <div className="legendText">Inativos</div>
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
