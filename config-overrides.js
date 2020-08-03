const { name } = require('./package');

module.exports = {
    runtimeCompiler: true, 
    webpack:(config)=>{
        // Keep the same with the registration in main app
        config.output.library = `${name}-[name]`;
        config.output.libraryTarget = 'umd';
        config.output.publicPath = 'http://localhost:7100/';
        config.output.jsonpFunction = `webpackJsonp_${name}`
        return config;
    },
    devServer:(configFunction)=>{
        return function (proxy,allowedHost){
            const config = configFunction(proxy,allowedHost);
            config.headers = {
                "Access-Control-Allow-Origin":'*'
            }
            return config
        }
    }
}