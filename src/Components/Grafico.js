import React, { useEffect, useState } from 'react';
import Style from '../Styles/Grafico.module.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

export function Grafico() {
  const [dados, setDados] = useState({ ativos: 0, inativos: 0 });

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
//   #f5ab00
// #ee8600
// #E76100
if (dados.ativos > 0) {
  seriesData.push({
    name: 'Ativos',
    y: dados.ativos,
    sliced: true,
    selected: true,
    color: '#ee8600'
  });
}

if (dados.inativos > 0) {
  seriesData.push({
    name: 'Inativos',
    color: '#353a47',
    y: dados.inativos
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
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}',
          style: {
            fontSize: '18px',
            
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

  const totalUsuarios = dados.ativos + dados.inativos;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="testeText" style={{ marginTop: '10px', marginBottom: '20px', fontSize: '18px', color: '#000000' }}>
      Usuários ativos / inativos
      </div>
      <div className="legendContainer" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: '#000000' }}>
        <div className="legendItem" style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
          <div className="legendSquare" style={{ width: '20px', height: '20px', borderRadius: '6px', backgroundColor: '#ee8600', marginRight: '5px' }}></div>
          <div className="legendText" >Ativos</div>
        </div>
        <div className="legendItem" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="legendSquare" style={{ width: '20px', height: '20px', borderRadius: '6px', backgroundColor: '#353a47', marginRight: '5px' }}></div>
          <div className="legendText">Inativos</div>
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
