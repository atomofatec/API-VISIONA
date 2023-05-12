import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export function Grafico() {

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
                    y: 3,
                    sliced: true,
                    selected: true,
                    color: '#6B8ABC'
                  }, {
                    name: 'inativo',
                    color: '#544FC5',
                    y: 5
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