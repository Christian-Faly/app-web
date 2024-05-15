import React, { Component } from 'react';

class Chart extends Component {
    render() {
        return (
            <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                    <div className="card card-primary">
                        <div className="card-header">
                        <h3 className="card-title">Type 1</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus" />
                            </button>
                            <button type="button" className="btn btn-tool" data-card-widget="remove">
                            <i className="fas fa-times" />
                            </button>
                        </div>
                        </div>
                        <div className="card-body">
                        <div className="chart">
                           <img src={require("./img/Donut.jpg")}/>
                            {/* <canvas id="areaChart" style={{minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%'}} /> */}
                        </div>
                        </div>
                    </div>
                    <div className="card card-danger">
                        <div className="card-header">
                        <h3 className="card-title">Type 2</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus" />
                            </button>
                            <button type="button" className="btn btn-tool" data-card-widget="remove">
                            <i className="fas fa-times" />
                            </button>
                        </div>
                        </div>
                        <div className="card-body">
                        <img src={require("./img/StackedBar.jpg")}/>
                        {/* <canvas id="donutChart" style={{minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%'}} /> */}
                        </div>
                    </div>
                    <div className="card card-danger">
                        <div className="card-header">
                        <h3 className="card-title">Type 3</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus" />
                            </button>
                            <button type="button" className="btn btn-tool" data-card-widget="remove">
                            <i className="fas fa-times" />
                            </button>
                        </div>
                        </div>
                        <div className="card-body">
                        <img src={require("./img/Pie.jpg")}/>
                        {/* <canvas id="pieChart" style={{minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%'}} /> */}
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="card card-info">
                        <div className="card-header">
                        <h3 className="card-title">Type 4</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus" />
                            </button>
                            <button type="button" className="btn btn-tool" data-card-widget="remove">
                            <i className="fas fa-times" />
                            </button>
                        </div>
                        </div>
                        <div className="card-body">
                        <div className="chart">
                        <img src={require("./img/Bar.jpg")}/>
                            {/* <canvas id="lineChart" style={{minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%'}} /> */}
                        </div>
                        </div>
                    </div>
                    <div className="card card-success">
                        <div className="card-header">
                        <h3 className="card-title">Type 5</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus" />
                            </button>
                            <button type="button" className="btn btn-tool" data-card-widget="remove">
                            <i className="fas fa-times" />
                            </button>
                        </div>
                        </div>
                        <div className="card-body">
                        <div className="chart">
                            <img src={require("./img/Area.jpg")}/>
                            {/* <canvas id="barChart" style={{minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%'}} /> */}
                        </div>
                        </div>
                    </div>
                    <div className="card card-success">
                        <div className="card-header">
                        <h3 className="card-title">Type 6</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus" />
                            </button>
                            <button type="button" className="btn btn-tool" data-card-widget="remove">
                            <i className="fas fa-times" />
                            </button>
                        </div>
                        </div>
                        <div className="card-body">
                        <div className="chart">
                            <img src={require("./img/Lines.jpg")}/>
                            {/* <canvas id="stackedBarChart" style={{minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%'}} /> */}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            </div>

        );
    }   
}

export default Chart;