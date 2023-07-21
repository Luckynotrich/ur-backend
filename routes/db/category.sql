SELECT category.id , cat_name, preference.id AS prefId, pref, procon'
        + ' FROM category LEFT JOIN preference ON category.id=preference.cat_id'
        + ' WHERE userId = $1 ORDER BY cat_name'