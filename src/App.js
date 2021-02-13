// useState is a function that returns array with 2 values
import React, { useState, useEffect } from "react";
import "./App.css";
// Dynamic, unique id
import { v4 as uuid } from "uuid";

import ExpensList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";

// Get the previously put expenses from local storage
const initialExpenses = localStorage.getItem("expenses")
    ? JSON.parse(localStorage.getItem("expenses"))
    : [];

function App() {
    // *** State values ***
    // All expenses, add expense
    const [expenses, setExpenses] = useState(initialExpenses);
    // Single expense - initial value = empty
    const [charge, setCharge] = useState(" ");
    // Single amount - initial value = empty
    const [amount, setAmount] = useState(" ");
    // alert that is false from the start
    const [alert, setAlert] = useState({ show: false });
    // Edit, initially we are not editing any item
    const [edit, setEdit] = useState(false);
    // Edit item
    const [id, setId] = useState(0);

    // *** use Effect ***
    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
        // Leave the array empty as the secodn parameter, so it doesn't re-render
    }, [expenses]);

    // *** Functionality ***
    // Passing the event object
    const handleCharge = (e) => {
        // Value is whatever we type in this input
        // Changing the value by passing new value
        setCharge(e.target.value);
    };

    // Handle Amount
    const handleAmount = (e) => {
        // Value is whatever we type in this input
        // Changing the value by passing new value
        setAmount(e.target.value);
    };

    // Handle alert, an object with two props
    const handleAlert = ({ type, text }) => {
        // Change the state of the show to true
        setAlert({ show: true, type, text });
        // Display the alert back to false in 3 seconds
        setTimeout(() => {
            setAlert({ show: false });
        }, 3000);
    };
    // Handle submit
    const handleSubmit = (e) => {
        // Prevent default
        e.preventDefault();

        // If the charge is not an empty string and amount is > 0
        if (charge !== "" && amount > 0) {
            // Are we editing or not?
            if (edit) {
                let tempExpenses = expenses.map((item) => {
                    // If the item matches the id in state
                    // Since this is es6, it's same as writing charge = charge amount=amount
                    return item.id === id ? { ...item, charge, amount } : item;
                });
                setExpenses(tempExpenses);
                setEdit(false);
                handleAlert({ type: "success", text: "Item edited" });
            } else {
                // This is same as writing charge=charge amount=amount
                const singleExpense = { id: uuid(), charge, amount };
                // Spread operator
                setExpenses([...expenses, singleExpense]);
                // Two types: one for the sucess and one for the danger
                handleAlert({ type: "success", text: "Item added" });
                // Reset the input back to the empty strings
            }

            setCharge("");
            setAmount("");
        } else {
            // If
            handleAlert({
                type: "danger",
                text: "Description can't be an empty value",
            });
        }
    };

    // Clear all items
    const clearItems = () => {
        // Pass an empty array, once
        setExpenses([]);
        handleAlert({ type: "danger", text: "Items Cleared" });
    };

    // Delete the single item
    const handleDelete = (id) => {
        // A callback function that is being applied to each and every array
        let tempExpenses = expenses.filter((item) => item.id !== id);
        // Set expenses to the updated array
        setExpenses(tempExpenses);
        handleAlert({ type: "danger", text: "Item Cleared" });
    };

    // Edit the single item
    const handleEdit = (id) => {
        // If item.id is equal to id return that item
        let expense = expenses.find((item) => item.id === id);
        let { charge, amount } = expense;
        setCharge(charge);
        setAmount(amount);
        setEdit(true);
        // ID that I'm getting as a parameter
        setId(id);
    };

    return (
        <>
            {/* Only display the alert if the show is true */}
            {alert.show && <Alert type={alert.type} text={alert.text} />}
            <Alert />
            <h1>Calculate your budget</h1>
            <main className="App">
                <ExpenseForm charge={charge} amount={amount} handleAmount={handleAmount} handleCharge={handleCharge} handleSubmit={handleSubmit} edit={edit} />
                <ExpensList expenses={expenses} handleDelete={handleDelete} handleEdit={handleEdit} clearItems={clearItems} />
            </main>
            <h1>
                total spending:{" "}
                <span className="total">
                    $
                    {expenses.reduce((acc, curr) => {
                        // ParseInt so the value is only numbers
                        return (acc += parseInt(curr.amount));
                    }, 0)}
                </span>
            </h1>
        </>
    );
}

export default App;
