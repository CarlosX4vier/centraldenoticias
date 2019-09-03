import React, { Component } from 'react';
import Article from '../componentes/article'

export default class Categorias extends Component {

    constructor(props) {
        super(props);
        let ord;
        if (this.props.ord === "c") {
            ord = { noticia: "flex-column", section: "col-6 col-md-3" }
        } else {
            ord = { noticia: "d-flex flex-row", section: "" }
        }
        this.state = { ord: ord, artigos: [] }
    }

    componentDidMount() {
        let artigos = [];
        this.props.articles.forEach(element => {
            artigos.push(<Article title={element.title} desc={element.desc} image={element.image} fonte={element.fonte}></Article>)
        });
        this.setState({ artigos: artigos }, () => console.log(artigos));
    }

    render() {
        return (
            <section className={"py-3 " + this.state.ord.section}>
                <h5 style={{ borderLeft: 'solid 5px' }} className="border-left-1 p-1 border-danger">{this.props.title}</h5>
                <div style={{ marginTop: '36px' }} className={"d-flex " + this.state.ord.noticia}>
                    {this.state.artigos}
                </div>
            </section >
        );
    }
}
