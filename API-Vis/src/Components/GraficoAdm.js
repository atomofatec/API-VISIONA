import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export function GraficoAdm() {

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
                    name: 'usuário comum',
                    y: 8,
                    color: '#6B8ABC'
                  }, {
                    name: 'administradores',
                    sliced: true,
                    selected: true,
                    color: '#544FC5',
                    y: 1
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