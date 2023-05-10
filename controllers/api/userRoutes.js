const router = require('express').Router();
const { User, Task } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    if (!newUser) {
      res
        .status(400)
        .json({ message: 'Unable to create new user, please try again!' });
    }

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.json({user: newUser, message: 'you are now logged in!'});
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong on our end. Please try again!' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/create/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {});

    const user = userData.get({ plain: true });

    res.render('createtask', {
      user,
      isLogged_in: req.session.logged_in,
    });
    console.log(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
