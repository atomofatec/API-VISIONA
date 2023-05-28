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

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Usuários comuns/Admnistradores'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}'
        }
      }
    },
    series: [
      {
        data: [{
          name: 'usuários comuns',
          y: dados.comuns,
          color: '#6B8ABC'
        }, {
          name: 'administradores',
          sliced: true,
          selected: true,
          color: '#544FC5',
          y: dados.admins
        }]
      }
    ]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}