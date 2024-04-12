SELECT r.id, r.name, r.cat_id, rev_url, rev_date, rating, rev_text, c.pref_id, p.procon
AS procon 
 FROM review r LEFT JOIN checked c ON c.rev_id = r.id 
 LEFT JOIN preference p ON c.pref_id = p.id
  LEFT JOIN category ON category.id = r.cat_id where category.userId = '11d6af03-20ac-4f04-a21c-28ec418a2c18' ORDER BY r.cat_id; 

  SELECT r.id, r.cat_id, rev_url, rev_date, rating, rev_text, c.pref_id, p.procon
AS procon 
 FROM review r LEFT JOIN checked c ON c.rev_id = r.id 
 LEFT JOIN preference p ON c.pref_id = p.id
  LEFT JOIN category ON category.id = r.cat_id where category.userId = '92285056-ac27-4e03-a719-e19c36d87ae2' ORDER BY r.cat_id;


const userId = '11d6af03-20ac-4f04-a21c-28ec418a2c18';/* lucky */
const userId = '92285056-ac27-4e03-a719-e19c36d87ae2';/* luckier */
