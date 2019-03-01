module.exports = function(sequelize, DataTypes) {
    var Sample = sequelize.define("Sample", {
      Segment: {
        type: DataTypes.STRING(16)
      },
      Country: {
        type: DataTypes.STRING(24)
      },
      Product: {
        type: DataTypes.STRING(9)
      },
      Discount_Band: {
        type: DataTypes.STRING(6)
      },
      Units_Sold: {
        type: DataTypes.DECIMAL(5, 1)
      },
      Manufacturing_Price: {
        type: DataTypes.INTEGER
      },
      Sale_Price: {
        type: DataTypes.INTEGER
      },
      Gross_Sales: {
        type: DataTypes.DECIMAL(8, 1)
      },
      Discounts: {
        type: DataTypes.DECIMAL(9, 3)
      },
      Sales: {
        type: DataTypes.DECIMAL(10, 3)
      },
      COGS: {
        type: DataTypes.DECIMAL(7, 1)
      },
      Profit: {
        type: DataTypes.DECIMAL(9, 3)
      },
      Date: {
        type: DataTypes.DATE
      },
      Month_Number: {
        type: DataTypes.INTEGER
      },
      Month_Name: {
        type: DataTypes.STRING(9)
      },
      Year: {
        type: DataTypes.INTEGER
      },
    });
  
    return Sample;
  };
  