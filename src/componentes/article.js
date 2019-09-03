import React from 'react';

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = { class: 'oculta' }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ class: 'show' });
        }, 200 * this.props.num)

    }

    componentWillReceiveProps() {
        this.setState({ class: 'oculta' })
        setTimeout(() => {
            this.setState({ class: 'show' });
        }, 300)
    }

    render() {
        return (
            <div className={" d-inline-flex noticia shadow rounded-sm p-0 m-2 " + this.state.class}>
                <div className="fonte shadow p-1 bg-danger  rounded">{this.props.fonte}</div>

                <div className="conteudoNoticia" style={{
                    minHeight: '150px'
                }
                }>
                    <div className="titleNoticia">
                        <div className="tituloNoticia text-white h-100">
                            <div className="p-2" style={{ bottom: 0, position: "absolute" }}>{this.props.title}</div>
                        </div>
                        <div className="h-100 bg-white p-2" style={{ position: 'relative' }}>
                            {this.props.desc}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <img style={{ width: '90%', height: "40%" }} src={this.props.image}></img>
                    </div>
                </div>
            </div>
        );
    }
}
export default Article