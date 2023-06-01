import React, { useEffect, useState } from 'react';
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

  const totalUsuarios = dados.comuns + dados.admins;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="testeText" style={{ marginTop: '10px', marginBottom: '20px', fontSize: '18px', color: '#000000' }}>
        Usuários comuns / Administradores
      </div>
      <div className="legendContainer" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: '#000000' }}>
        <div className="legendItem" style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
          <div className="legendSquare" style={{ width: '20px', height: '20px', borderRadius: '6px', backgroundColor: '#f5ab00', marginRight: '5px' }}></div>
          <div className="legendText">Usuários comuns</div>
        </div>
        <div className="legendItem" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="legendSquare" style={{ width: '20px', height: '20px', borderRadius: '6px', backgroundColor: '#E76100', marginRight: '5px' }}></div>
          <div className="legendText">Administradores</div>
        </div>
      </div>
      <div className="graficoContainer">
        <div className="chartWrapper" style={{ width: '100%', height: '100%' }}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
      <div className="totalUsuarios" style={{ marginTop: '0px', fontSize: '18px', color: '#000000' }}>
        Total de usuários: {totalUsuarios}
      </div>
    </div>
  );
}
