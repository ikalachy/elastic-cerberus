import React, { Component } from "react";
import ReactDOM from "react-dom";

import {
  ReactiveBase,
  SingleList,
  ReactiveList,
  SelectedFilters
} from "@appbaseio/reactivesearch";

import "./index.css";

class Main extends Component {
  render() {
    return (
      <ReactiveBase
        app="gds-ops-application-*"
        url="https://vpc-gds-ops-kibana-awoznnccsxigh6yzfuwplrzw7i.eu-west-1.es.amazonaws.com"
      >
        <div className="row">
          <div className="col">
            <SingleList
              componentId="BookSensor"
              dataField="kubernetes.namespace_name.keyword"
              aggregationSize={100}
            />
          </div>

          <div className="col">
            <SelectedFilters />
            <ReactiveList
              componentId="SearchResult"
              dataField="log"
              className="result-list-container"
              from={0}
              size={5}
              renderItem={this.booksReactiveList}
              react={{
                and: ["BookSensor"]
              }}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }

  booksReactiveList(data) {
    return (
      <div className="flex book-content" key={data._id}>
        <img src={data.image} alt="Book Cover" className="book-image" />
        <div className="flex column justify-center" style={{ marginLeft: 20 }}>
          <div className="book-header">{data.original_title}</div>
          <div className="flex column justify-space-between">
            <div>
              <div>
                by <span className="authors-list">{data.authors}</span>
              </div>
              <div className="ratings-list flex align-center">
                <span className="stars">
                  {
                    Array(data.average_rating_rounded)
                      .fill("x")
                      .map((item, index) => (
                        <i className="fas fa-star" key={index} />
                      )) // eslint-disable-line
                  }
                </span>
                <span className="avg-rating">({data.average_rating} avg)</span>
              </div>
            </div>
            <span className="pub-year">
              Pub {data.original_publication_year}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
