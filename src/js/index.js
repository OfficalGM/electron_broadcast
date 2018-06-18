import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import ReactDOM from "react-dom";

function capture_desktop() {
    
    const thumbSize = determineScreenShotSize()
    let options = { types: ['screen'], thumbnailSize: thumbSize }
    window.desktopCapturer.getSources(options, function (error, sources) {
        if (error) return console.log(error)
        sources.forEach(function (source) {
            if (source.name === 'Entire screen' || source.name === 'Screen 1') {
                const screenshotPath = path.join('./public/screenshot.png')
                console.log("screenshotPath="+screenshotPath)
                fs.writeFile(screenshotPath, source.thumbnail.toPNG(), function (error) {
                    if (error) return console.log(error)

                })
            }

        })
    })
}
function determineScreenShotSize() {
    const screenSize = window.srceen.getPrimaryDisplay().workAreaSize
    const maxDimension = Math.max(screenSize.width, screenSize.height)
    return {
        width: maxDimension * window.devicePixelRatio,
        height: maxDimension * window.devicePixelRatio
    }
}



class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            readOnly: true,
            port: 7070
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({port: event.target.value});
    }
    handleClick() {  
        let port = this.state.port
        console.log(port)
        
        window.ipc.send('start_server', port)
        setInterval(capture_desktop, 500)
    }
    render() {
        return (
            <div className="container">
                <div className="row ">
                    <div className="col mt-5 border border-success rounded ">
                        <form className='p-5'>
                            <div className="form-group row ">
                                <label className="col-sm-2 col-form-label">網路位置:</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control-plaintext" value="127.0.0.1" readOnly={this.state.readOnly}></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">端口:</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" onChange={this.handleChange} placeholder="port" value={this.state.port}></input>
                                </div>
                            </div>
                            <button onClick={this.handleClick} type="button" className="btn btn-outline-primary mb-3">啟動</button>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
