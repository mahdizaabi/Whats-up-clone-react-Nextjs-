/***
 * getContactEmail: pick up the contact email
 * @users: list of 2 items(eemails): user logedin and contact user
 * @ userLoggedIn: the current logged user
 * Return: The contact email
 *
 ***/
const getContactEmail = (users, userLoggedIn) =>
  users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0];

export default getContactEmail;
