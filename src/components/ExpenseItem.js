// Responsible for each and every item
// This item will be in ExpenseList
import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const ExpenseItem = ({ expense, handleEdit, handleDelete }) => {
    const { id, charge, amount } = expense;

    return (
        <li className="item">
            <div className="info">
                <span className="expense">{charge}</span>
                <span className="amount">${amount}</span>
            </div>
            <div>
                {/* // Since we don't want to invoke this function with (), I use the es6 syntax */}
                <button className="edit-btn" aria-label="edit button"onClick={() => handleEdit(id)}>
                    <MdEdit />
                </button>
                
                {/* // Since we don't want to invoke this function with (), I use the es6 syntax */}
                <button className="clear-btn" aria-label="delete button" onClick={() => handleDelete(id)}>
                    <MdDelete />
                </button>
            </div>
        </li>
    );
};

export default ExpenseItem;
