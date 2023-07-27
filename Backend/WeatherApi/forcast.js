import request from 'request'
export const forcast=(latt,long,callback) => {
    const url=`http://api.weatherstack.com/current?access_key=e6295ae91709e62cc99d3fb3d7adb3f4&query=`+latt +',' + long   
     request({url:url,json:true},(error,res) => {
        if(error){
            callback('unable to connect some isssue',undefined)
        }
        else if(res.body.error){
            callback('unable to connect there is error',undefined)
        }
        else{
            callback(undefined,{
                weather_icon : res.body.current.weather_icons[0],
                description:res.body.current.weather_descriptions[0],
                temperature:res.body.current.temperature,
                pricip:res.body.current.precip,
                humidity:res.body.current.humidity,
                windspeed:res.body.current.wind_speed
            })
        }
     })
}
