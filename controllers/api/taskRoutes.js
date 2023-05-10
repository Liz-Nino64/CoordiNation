const router = require('express').Router();
const { Task, User } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.post('update/:id', withAuth, async (req, res) => {
  try {
    const newTask = await Task.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTask);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/delete/:id', withAuth, async (req, res) => {
  try {
    const taskData = await Task.destroy({
      where: {
        id: req.params.id,
        /* user_id: req.session.user_id, */
      },
    });
    console.log(taskData);
    if (!taskData) {
      res.status(404).json({ message: 'No task found with this id!' });
      return;
    }

    res.status(200).json(taskData);
  } catch (err) {
    res.status(500).json(err);
  }
});


/* router.get('/find/:id', async (req, res) => {
  try {
    const taskData = await Task.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const task = taskData.get({ plain: true });

    res.render('task', {
      ...task,
      logged_in: req.session.logged_in,
    });
    console.log(task);
  } catch (err) {
    res.status(500).json(err);
  }
}); */

router.get('/find', async (req, res) => {
  try {
    const taskData = await Task.findAll({
      where:{
        user_id: req.session.user_id
      },
      attributes: ['id', 'taskname', 'description', 'status', 'priority', 'dateDue', 'user_id', [sequelize.literal('user.name'), 'userName']],
      include: [
        {
          model: User,
          attributes: ['name'],
          raw:true
        }
      ],
      raw:true
    });
    console.log(taskData);
    //const task = taskData.get({ raw: true });
    res.render('task', {
      taskData,
      logged_in: req.session.logged_in,
    });
    /* console.log(task);
    res.render('task', {
      ...task,
      logged_in: req.session.logged_in,
    }); */

  } catch (err) {
    res.status(500).json(err);
  }
});





module.exports = router;
