import React, { Component } from "react";
import { Card } from '@uifabric/react-cards';
import {
    Stack
} from 'office-ui-fabric-react';
import MusicPlayer from './MusicPlayer'


export default class CardTemplate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playMusic: false
        }
    }

    cardClicked = () => {
        this.setState({
            playMusic: true
        })
    };

    onDismiss =() => {
        this.setState({
            playMusic: false
        })
    }

    render() {
        return (
            <React.Fragment>
                <Stack horizontal>
                    <Card
                        aria-label="Clickable vertical card with image bleeding at the top of the card"
                        onClick={() => { this.cardClicked() }}
                        className="cardBorder"
                    >
                        <Card.Section
                            fill
                            verticalAlign="end"
                        >
                            {this.props.type === "playlist" ?
                                <React.Fragment>
                                    <img className="w-100"
                                        src={this.props.playlistData.thumbnail === undefined ?
                                            (process.env.PUBLIC_URL + "/images/playlist-5.png") :
                                            this.props.playlistData.thumbnail}
                                        alt="playlist-5"
                                    />
                                    <div className="overlayCard m-0 w-100">
                                        <div className="textCard text-left">
                                            <h5>{this.props.playlistData.title === undefined ? "test" : this.props.playlistData.title}</h5>
                                            <p>DJ Nikhil</p>
                                        </div>
                                    </div>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <img className="w-100"
                                        src={(this.props.playlistData.profileImage === undefined || this.props.playlistData.profileImage === "undefined") ?
                                            process.env.PUBLIC_URL + "/images/playlist-5.png" :
                                            this.props.playlistData.profileImage}
                                        alt={process.env.PUBLIC_URL + "/images/playlist-5.png"}
                                    />
                                    <div className="overlayCard m-0 w-100">
                                        <div className="textCard text-left">
                                            <h5>{this.props.playlistData.firstName + this.props.playlistData.lastName}</h5>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                        </Card.Section>
                    </Card>
                </Stack>
                {this.props.type === "playlist" ?
                    <MusicPlayer
                        showPlayer={this.state.playMusic}
                        thumbnail={this.props.playlistData.thumbnail}
                        title={this.props.playlistData.title}
                        price={this.props.playlistData.price}
                        sampleContent={this.props.playlistData.sampleContent}
                        onDismiss={() => { this.onDismiss() }}
                    /> : null}
            </React.Fragment>
        )
    }
}