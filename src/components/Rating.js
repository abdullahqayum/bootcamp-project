import React, { Component } from 'react';




class Rating extends Component {

    render() {
        return (

            <div className="rating">
                <span>
                    <i
                        className={
                            this.props.rating >= 1
                                ? 'fa fa-star'
                                : this.props.rating >= 0.5
                                    ? 'fa fa-star-half-o'
                                    : 'fa fa-star-o'
                        }
                    ></i>
                </span>
                <span>
                    <i
                        className={
                            this.props.rating >= 2
                                ? 'fa fa-star'
                                : this.props.rating >= 1.5
                                    ? 'fa fa-star-half-o'
                                    : 'fa fa-star-o'
                        }
                    ></i>
                </span>
                <span>
                    <i
                        className={
                            this.props.rating >= 3
                                ? 'fa fa-star'
                                :this.props.rating >= 3
                                >= 2.5
                                    ? 'fa fa-star-half-o'
                                    : 'fa fa-star-o'
                        }
                    ></i>
                </span>
                <span>
                    <i
                        className={
                            this.props.rating >= 4
                                ? 'fa fa-star'
                                : this.props.rating >= 3.5
                                    ? 'fa fa-star-half-o'
                                    : 'fa fa-star-o'
                        }
                    ></i>
                </span>
                <span>
                    <i
                        className={
                            this.props.rating >= 5
                                ? 'fa fa-star'
                                : this.props.rating >= 4.5
                                    ? 'fa fa-star-half-o'
                                    : 'fa fa-star-o'
                        }
                    ></i>
                </span>
            </div>

        );
    }
}

export default Rating;
