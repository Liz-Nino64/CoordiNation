const router = require('express').Router();
const { Task, User } = require('../../models');
const withAuth = require('../../utils/auth');



router.put('update/:id', withAuth, async (req, res) => {
  try {
    const newTask = await Task.update({
      ...req.body,
      // user_id: req.body.user_id,
      taskname: req.body.taskname,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      dateDue: req.body.dateDue,
    },
    {
      where:{
        id:req.params.id
      },
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

router.get('/find/:id', async (req, res) => {
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
      isLogged_in: req.session.logged_in,
    });
    console.log(task);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/create', async (req, res) => {
  try {
    const newTask = await Task.create({
      taskname: req.body.taskname,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      dateDue: req.body.dateDue,
    });

    if (!newTask) {
      res
        .status(400)
        .json({ message: 'Unable to create new task, please try again!' });
    }


    res.json({user: newTask, message: 'you are now logged in!'});
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong on our end. Please try again!' });
  }
});


module.exports = router;
