import React, { Component } from 'react';
import Popup from '../../src';
import $ from 'jquery'
import Deferred from 'bplokjs-deferred'

function Test() {
    console.log(1);
    return null;
}

export default class DEMO extends Component {

    state = {
        visible: false,
    }

    toggleClick = e => {
        const { visible } = this.state;
        this.setState({
            visible: !visible
        });
    }

    refButton = (dom) => {
        this._defer.resolve({
            of: dom,
            my: 'left top',
            at: 'left bottom'
        });
    }

    refButton2 = (dom) => {
        this._defer2.resolve({
            of: dom,
            my: 'left center',
            at: 'right center'
        });
    }

    _defer = Deferred()
    _defer2 = Deferred()

    componentDidMount() {
        setInterval(this.forceUpdate.bind(this), 1000)
    }

    render() {
        const { visible } = this.state;
        const defer = Deferred();

        return (
            <div ref={dom => dom && defer.resolve({ of: dom.parentElement })}>
                <button onClick={this.toggleClick}>{visible ? '关闭' : '显示'}</button>
                <Popup visible={visible} resetPositionOnUpdate>
                    <div className="dialog">
                        center...
                    </div>
                </Popup>
                <button onClick={this.toggleClick} ref={this.refButton}>trigger</button>
                <Popup visible={visible} placement={this._defer}>
                    <div className="dialog">
                        trigger1...
                    </div>
                </Popup>
                <button onClick={this.toggleClick} ref={this.refButton2}>animate</button>
                <Popup
                    visible={visible}
                    placement={this._defer2}
                    timeout={500}
                    onEnter={node => {
                        $(node).hide();
                        $(node).stop().fadeIn(500)
                    }}
                    onExit={node => {
                        $(node).stop().fadeOut(500)
                    }}
                    style={{
                        border: "5px solid #ccc"
                    }}
                    onClick={() => alert('you clicked!')}
                >
                    <div className="dialog">
                        trigger2...
                        <Test />
                    </div>
                </Popup>

                <Popup
                    visible={visible}
                    resetPositionOnUpdate
                    style={{
                        background: '#ccc',
                        padding: 10
                    }}
                    placement={
                        defer
                    }
                >
                    <div>
                        center2...
                    </div>
                </Popup>
            </div >
        );
    }

}
