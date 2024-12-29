let expensesChart;
function calculate() {
    // 獲取收入
    const salary = Number(document.getElementById('salary').value) || 0;

    // 計算存款（薪水的40%）
    const savingsAmount = salary * 0.4;

    // 獲取支出
    const rent = Number(document.getElementById('rent').value) || 0;
    const utilities = Number(document.getElementById('utilities').value) || 0;
    const food = Number(document.getElementById('food').value) || 0;
    const transport = Number(document.getElementById('transport').value) || 0;

    // 計算總支出
    const totalExpenses = rent + utilities + food + transport;

    // 計算剩餘金額（薪水 - 存款 - 支出）
    const remaining = salary - savingsAmount - totalExpenses;

    // 更新顯示結果
    document.getElementById('savingsAmount').textContent = savingsAmount.toFixed(0);
    document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(0);
    document.getElementById('savings').textContent = savingsAmount.toFixed(0);
    document.getElementById('remaining').textContent = remaining.toFixed(0);

    // 根據剩餘金額改變顏色
    const remainingElement = document.getElementById('remaining');
    if (remaining < 0) {
        remainingElement.style.color = 'red';
    } else {
        remainingElement.style.color = 'green';
    }
    const chartData = {
        labels: ['房租', '水電費', '伙食費', '交通費', '存款', '剩餘金額'],
        datasets: [{
            data: [rent, utilities, food, transport, savingsAmount, remaining],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
            ]
        }]
    };

    if (expensesChart) {
        expensesChart.destroy();
    }

    // 計算總金額（用於計算百分比）
    const total = rent + utilities + food + transport + savingsAmount + remaining;

    expensesChart = new Chart(document.getElementById('expensesChart'), {
        type: 'pie',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: '收支分配圖'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${value}元 (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}