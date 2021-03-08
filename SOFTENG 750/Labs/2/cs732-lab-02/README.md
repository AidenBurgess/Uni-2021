# COMPSCI 732 / SOFTENG 750 Lab 02
In this lab, we'll use techniques covered primarily in Week Two (but also reinforcing content learned last week) to complete a simple customer database application.

**Note:** This project uses the **Day.js** package for managing and displaying dates. It hasn't been taught in class, but it is easy to use. Its documentation can be found at <https://day.js.org/>.


## Exercise One - Persisting sorting
Take a look at the application in the [exercise-01](./exercise-01) folder, as it has been provided to you. Run the application and make sure you can see it working. You'll notice that each column in the customers table has a sort button next to the column header. The table may be sorted by each of its columns, in either order. Try this out to make sure it works.

However, you'll also notice that whenever you refresh or reload the page, your chosen sort column / order is lost - the table defaults to unsorted every time. This is poor usability and we'll want to fix this.

To do so, use one of the solutions introduced in the lecture content, to persist the sort property and sort direction of the [CustomerTable](./exercise-01/src/CustomerTable.js) component, such that whenever the page is refreshed or reloaded, the user's chosen sorting options are preserved.


## Exercise Two - New customers
Continuing on from Exercise One, add functionality to the webapp to be able to add new customers.

Specifically, perform the following tasks:
- Add an "add new customer" button at the bottom-right of the table. When clicked, navigate to `/customers/add`
- When we have navigated to `/customers/add`, display a `Modal` dialog allowing the entry of new customer information. The user should have the ability to accept or cancel the action at this point.
- If the action is cancelled, we should navigate "back" one level in the history
- If the naction is completed, we should add the new customer, navigate to '/customers' to see the new customer in the table.

**Hints:**
- See "adding new articles" in the provided examples.
- The required `dayjs` format for the HTML `<input type="date">` date picker is `YYYY-MM-DD`.


## Exercise Three: Customer summary in NavBar
Continuing from Exercise Two, extend the app so that in the [NavBar](./exercise-01/src/NavBar.js) component, to the far right of the component, a summary of the number of customers in each tier is given. For example, given the initial customer list in [data.js](./exercise-01/src/data.js), the following HTML might be rendered:

```html
<div>
Customer details: Bronze: 1, Silver: 1, Gold: 2, Platinum: 2. <strong>Total: </strong>6
</div>
```

As the user edits the customer list in any way (e.g. by adding customers using your solution to Exercise Two), this summary should update accordingly.

**Hint:** As the customer state is now required in `NavBar`, but is currently located only in the sibling `CustomersPage` component, you'll need to refactor your webapp to move the state elsewhere. There are several ways you could do this, as discussed in lectures.


## Exercise Four: Material-UI
For the final exercise, make a copy of your `exercise-01` webapp and rename the copy `exercise-04`. This is so you'll be able to see and refer to your Exercise One to Three code, separate from your Exercise Four code.

Modify the `exercise-04` copy so that instead of custom CSS, it uses [Material-UI](https://material-ui.com/) or another UI framework of your choice.