SELECT category.id, cat_name, preference.id
         AS prefId, pref, procon
         FROM category 
         LEFT JOIN preference ON category.id=preference.cat_id
         WHERE  EXISTS (SELECT category.id FROM category
          WHERE category.userId = '3d99966d-b1ad-4ea4-bcdd-49062f2f3f1f') 
         AND category.userId = '3d99966d-b1ad-4ea4-bcdd-49062f2f3f1f'
         ORDER BY cat_name;


         SELECT category.id, cat_name, preference.id
         AS prefId, pref, procon
         FROM category 
         LEFT JOIN preference ON category.id=preference.cat_id
         WHERE  EXISTS (SELECT category.id FROM category
         WHERE category.userId = '92285056-ac27-4e03-a719-e19c36d87ae2') 
         AND category.userId = '92285056-ac27-4e03-a719-e19c36d87ae2'
         ORDER BY cat_name;

         SELECT category.id, cat_name, preference.id
         AS prefId, pref, procon
         FROM category 
         LEFT JOIN preference ON category.id=preference.cat_id
         WHERE  EXISTS (SELECT category.id FROM category
          WHERE category.userId = '11d6af03-20ac-4f04-a21c-28ec418a2c18') 
         AND category.userId = '11d6af03-20ac-4f04-a21c-28ec418a2c18'
         ORDER BY cat_name;