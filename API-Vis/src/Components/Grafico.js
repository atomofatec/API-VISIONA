import React, { useEffect, useState } from 'react';
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

    const options = {
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Usuários ativos/inativos'
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
                    name: 'ativo',
                    y: dados.ativos,
                    sliced: true,
                    selected: true,
                    color: '#6B8ABC'
                  }, {
                    name: 'inativo',
                    color: '#544FC5',
                    y: dados.inativos
                  }]
              }
        ]
      };

    return(
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}