import React, { Component } from "react";
import { Card } from '@uifabric/react-cards';
import {
  Stack
} from 'office-ui-fabric-react';


export default class CardTemplate extends Component {

    alertClicked = () => {
        alert('Clicked');
    };

    render() {
        return (
            <React.Fragment>
                <Stack horizontal>
                    <Card
                        aria-label="Clickable vertical card with image bleeding at the top of the card"
                        onClick={this.alertClicked}
                        className="cardBorder"
                        // tokens={cardTokens}
                    >
                        <Card.Section
                            fill
                            verticalAlign="end"
                            // styles={backgroundImageCardSectionStyles}
                            // tokens={backgroundImageCardSectionTokens}
                        >
                            <img className="w-100" src={process.env.PUBLIC_URL + "/images/playlist-5.png"} alt="playlist-5" />
                            <div className="overlayCard m-0 w-100">
                                <div className="textCard text-left">
                                    <h5>Playlist Name</h5>
                                    <p>DJ Nikhil</p>
                                </div>
                            </div>
                        </Card.Section>
                    </Card>
                </Stack>
            </React.Fragment>
        )
    }
}