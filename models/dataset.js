module.exports = function(sequelize, DataTypes) {
	var dataset = sequelize.define('dataset', {
		json_data: {
			type: DataTypes.JSON,
			allowNull: false
		},
		user_id1: {
			type: DataTypes.INTEGER,
			references: {
				model: sequelize.models.user,
				key: 'id'
			}
		}
	});

	dataset.associate = function(models) {
		dataset.belongsTo(models.user, {
			foreignKey: 'user_id1',
			constraints: false
		  });
	  };
	return dataset;
  };
