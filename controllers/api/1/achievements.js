

const getAchievements = async (req, res, next) => {
  try {
    res.status(501).json({message: 'Очікує на реалізацію'})
  } catch (err) {
    res.status(500).json({message: 'Помилка на боці серверу'})
  }
}

const updateAchievements = async (req, res, next) => {
  try {
    res.status(501).json({message: 'Очікує на реалізацію'})
  } catch (err) {
    res.status(500).json({message: 'Помилка на боці серверу'})
  }
}

module.exports = {getAchievements, updateAchievements};