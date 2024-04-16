import React from 'react';
import { useSelector } from 'react-redux';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
    ComposedChart, Area, Line, RadialBarChart, RadialBar 
} from 'recharts';

function CustomerFeedBack() {
    const product = useSelector((state) => state.user.productData) || [];
    const transaction = useSelector((state) => state.user.transactionData) || [];
console.log(product);
    // Get first 7 products from the product array
    const limitedProductData = product.slice(0, 7);
    const productsNeedImprovement = product.filter(item => item.rating < 3);

    // Transform limited product data for BarChart
    const chartData = limitedProductData.map(item => ({
        name: item.name,
        pv: item.rating, 
    }));

    // Transform transaction data for ComposedChart
    const changeData2 = transaction.map(item => ({
        name: item.name,
        uv: item.amount,
        pv: item.amount, // using amount as pv value
        amount: item.amount * 2, // example calculation, adjust as needed
    }));

    const chartData3 = productsNeedImprovement.map(item => ({
        name: item.name,
        ratingScaled: item.rating * 10,  // Multiply by 10 to scale it to the chart range
        fill: '#8884d8',
    }));    

    const style = {
        top: '50%',
        right: 0,
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${label} : ${payload[0].value}`}</p>
                    <p className="desc">Amount: {payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='mt-5 '>
            <h2>Rating Analysis</h2>
            <ResponsiveContainer width="55%" height={300}>
                <BarChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="pv" barSize={20} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

                    <h1>Transaction Analysis</h1>
            <ResponsiveContainer width="60%" height={400}>
                <ComposedChart
                    width={500}
                    height={400}
                    data={changeData2}
                    margin={{
                        top: 20,
                        right: 80,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" label={{ value: 'Pages', position: 'insideBottomRight', offset: 0 }} scale="band" />
                    <YAxis label={{ value: 'Index', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="amount" fill="#8884d8" stroke="#8884d8" />
                    <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                </ComposedChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={chartData3}>
                    <RadialBar
                        minAngle={15}
                        label={{ position: 'insideStart', fill: '#fff' }}
                        background
                        clockWise
                        dataKey="ratingScaled"  // DataKey remains the same as it's consistent with the data
                    />
                    <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                </RadialBarChart>
            </ResponsiveContainer>


        </div>
    );
}

export default CustomerFeedBack;
