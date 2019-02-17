import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import {FiSearch} from 'react-icons/fi';
import {MdClose} from 'react-icons/md'
import './Search.scss';


class Search extends Component {
    state = {
        searchFormOpened: false
    };

    tooglesearchForm = () => {
        this.setState({searchFormOpened: !this.state.searchFormOpened});
    };

    render() {
        return (
            <div className="searchContent">
                <a href="#" className="searchLink" onClick={this.tooglesearchForm}>
                    <FiSearch className={this.state.searchFormOpened ? "searchLinkIconSearch hide" : "searchLinkIconSearch"}/>
                    <MdClose className={this.state.searchFormOpened ? "searchLinkIconClose show" : "searchLinkIconClose"}/>
                </a>


                <form action="#" method="get"
                      className={this.state.searchFormOpened ? "searchForm open" : "searchForm"}>
                    <input className="searchForm__search" type="search" name="search" placeholder="Search"/>
                    {/*<span className="searchForm__clean"></span>*/}
                    <button type="submit" className="searchForm__btn">
                        <FiSearch className="searchForm__icon"/>
                    </button>
                </form>
                <div className="searchFormResult">
                    <ul className="searchFormResult__list">
                        <li className="searchFormResult__item">
                            <a href="#" className="searchFormResult__link"></a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Search;