import React from "react";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({ charge, amount, handleCharge, handleAmount, handleSubmit, edit }) => {

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label className="form-title" htmlFor="charge">Description</label>
                    <input type="text" className="form-control" id="charge" name="charge" value={charge} placeholder="Enter the Description" onChange={handleCharge} />
                </div>
                <div className="form-group">
                    <label className="form-title" htmlFor="amount">Amount</label>
                    {/* // We are getting this from the state */}
                    <input type="number" className="form-control" id="amount" name="amount" placeholder="Enter the Amount" value={amount} onChange={handleAmount}/>
                </div>
            </div>
            <button type="submit" className="btn">{edit ? "edit" : "submit"}<MdSend className="btn-icon" /></button>
        </form>
    );
};

export default ExpenseForm;
