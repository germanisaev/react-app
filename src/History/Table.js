import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './AddHistory.css';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = { deleted: false };
  }

  DeleteHistory = () => {
    var result = confirm("Are you sure you want to delete this item?");
    if (result) {
      axios
      .delete(
        "https://localhost:44372/api/history/" +
          this.props.obj.Id
      )
      .then((json) => {
        if (json) {
          // this.props.onDeleted(this.props.obj.Id)
          this.setState({deleted: true})
          alert("Record deleted successfully!!");
        }
      });
    }
  };
  render() {
    return (
      <tr style={{'display': this.state.deleted ? 'none' : 'table-row'}}>
        <td>
          <span>
          {this.props.obj.Value1}
          </span>
          <span>
          {
          this.props.obj.Operator == 1 ? '+' :
          this.props.obj.Operator == 2 ? '-' :
          this.props.obj.Operator == 3 ? '*' :
          '/'
          }
          </span>
          <span>
          {this.props.obj.Value2}
          </span>
          <span>
          =
          </span>
          <span>
          {this.props.obj.Result}
          </span>
          <span>
          <Link to={"/edit/" + this.props.obj.Id} className="btn btn-success">
          &#9998;
          </Link>
          </span>
          <span>
          <button type="button" onClick={this.DeleteHistory} className="btn btn-danger">
            &#10005;
          </button>
          </span>
        </td>
      </tr>
    );
  }
}

export default Table;

