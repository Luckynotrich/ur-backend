--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Ubuntu 16.2-1.pgdg22.04+1)
-- Dumped by pg_dump version 16.2 (Ubuntu 16.2-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: lucky
--

INSERT INTO public."user" VALUES ('11d6af03-20ac-4f04-a21c-28ec418a2c18', 'rich.rhaskell@gmail.com', 'fr4gt5hy6', 'luckyman');
INSERT INTO public."user" VALUES ('92285056-ac27-4e03-a719-e19c36d87ae2', 'luckynotrich@github.com', 'xsw21qaz#', 'luckier');
INSERT INTO public."user" VALUES ('3d99966d-b1ad-4ea4-bcdd-49062f2f3f1f', 'luckiest@lucky.com', 'luckies', 'luckiest');


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: lucky
--

INSERT INTO public.category VALUES (1016, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'I am the Walrus');
INSERT INTO public.category VALUES (400, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'Code Editors');
INSERT INTO public.category VALUES (401, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'Restaurant');
INSERT INTO public.category VALUES (402, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'Music Venue');
INSERT INTO public.category VALUES (403, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'Mentor/Tutor');
INSERT INTO public.category VALUES (404, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'Loaded Touring Bicycles');
INSERT INTO public.category VALUES (405, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'Hiking Trail');
INSERT INTO public.category VALUES (1020, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'sushi');
INSERT INTO public.category VALUES (568, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'Js Libraries');
INSERT INTO public.category VALUES (433, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'Coding Job');
INSERT INTO public.category VALUES (435, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'Ice Cream');
INSERT INTO public.category VALUES (578, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'Movies');
INSERT INTO public.category VALUES (438, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'Russian Imperial Stout');
INSERT INTO public.category VALUES (794, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'Cheese');
INSERT INTO public.category VALUES (808, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'I am the Dude');
INSERT INTO public.category VALUES (810, '11d6af03-20ac-4f04-a21c-28ec418a2c18', 'hearing aids');


--
-- Data for Name: preference; Type: TABLE DATA; Schema: public; Owner: lucky
--

INSERT INTO public.preference VALUES (101, 400, 'Great Community Support', true);
INSERT INTO public.preference VALUES (102, 400, 'Inconsistent Interface', false);
INSERT INTO public.preference VALUES (103, 400, 'Crashes Often', false);
INSERT INTO public.preference VALUES (104, 400, 'Requires Excess Configuration', false);
INSERT INTO public.preference VALUES (105, 405, 'Spectacular Scenery', true);
INSERT INTO public.preference VALUES (106, 405, 'Great Destination', true);
INSERT INTO public.preference VALUES (107, 405, 'Swimming', true);
INSERT INTO public.preference VALUES (108, 400, 'Intuitive interface', true);
INSERT INTO public.preference VALUES (109, 400, 'Regularly Updated', true);
INSERT INTO public.preference VALUES (110, 400, 'Support for many Code Languages', true);
INSERT INTO public.preference VALUES (111, 400, 'Upfront cost for use', false);
INSERT INTO public.preference VALUES (112, 405, 'Drinking Water', true);
INSERT INTO public.preference VALUES (113, 405, 'Crowded', false);
INSERT INTO public.preference VALUES (114, 405, 'Horses/Bicycles', false);
INSERT INTO public.preference VALUES (115, 405, 'Burn Zone', false);
INSERT INTO public.preference VALUES (116, 405, 'Biting Bugs', false);
INSERT INTO public.preference VALUES (117, 401, 'Great Menu', true);
INSERT INTO public.preference VALUES (118, 401, 'good food', true);
INSERT INTO public.preference VALUES (119, 401, 'Great Beer list', true);
INSERT INTO public.preference VALUES (120, 401, 'live music', true);
INSERT INTO public.preference VALUES (121, 401, 'Bad acoustics', false);
INSERT INTO public.preference VALUES (122, 401, 'bad service', false);
INSERT INTO public.preference VALUES (123, 401, 'rude staff', false);
INSERT INTO public.preference VALUES (124, 401, 'over priced', false);
INSERT INTO public.preference VALUES (125, 404, 'Less than 25lbs', true);
INSERT INTO public.preference VALUES (126, 404, 'Disk Breaks', true);
INSERT INTO public.preference VALUES (127, 404, 'Front and back racks included', true);
INSERT INTO public.preference VALUES (128, 404, 'Multiple bottle mounts', true);
INSERT INTO public.preference VALUES (129, 404, 'Cost more than $2500', false);
INSERT INTO public.preference VALUES (130, 404, 'Flat bars', false);
INSERT INTO public.preference VALUES (131, 404, 'Heavy', false);
INSERT INTO public.preference VALUES (132, 404, 'Off brand parts', false);
INSERT INTO public.preference VALUES (133, 403, 'Personal Connection/ Common interests', true);
INSERT INTO public.preference VALUES (134, 403, 'Good with medium and big picture guidance', true);
INSERT INTO public.preference VALUES (135, 403, 'Conversationally diagnoses a problem before going to code', true);
INSERT INTO public.preference VALUES (136, 403, 'Expert in web coding', true);
INSERT INTO public.preference VALUES (137, 403, 'Coaches / Cheer leads', true);
INSERT INTO public.preference VALUES (138, 403, 'Not often available', false);
INSERT INTO public.preference VALUES (139, 403, 'Doesn''t listen and ask questions', false);
INSERT INTO public.preference VALUES (140, 403, 'Lacks Interest', false);
INSERT INTO public.preference VALUES (141, 403, 'Isn''t prepared to fill voids', false);
INSERT INTO public.preference VALUES (142, 402, 'Good seating', true);
INSERT INTO public.preference VALUES (143, 402, 'Music Variety', true);
INSERT INTO public.preference VALUES (144, 402, 'Good Dance Floor', true);
INSERT INTO public.preference VALUES (145, 402, 'Good Bar', true);
INSERT INTO public.preference VALUES (146, 402, 'Good Food', true);
INSERT INTO public.preference VALUES (147, 402, 'Bad acoustics', false);
INSERT INTO public.preference VALUES (148, 402, 'bad crowd', false);
INSERT INTO public.preference VALUES (149, 402, 'small space', false);
INSERT INTO public.preference VALUES (150, 402, 'over priced', false);
INSERT INTO public.preference VALUES (151, 433, 'Based locally remote', true);
INSERT INTO public.preference VALUES (152, 433, 'Friendly Boss', true);
INSERT INTO public.preference VALUES (153, 433, 'Nodejs', true);
INSERT INTO public.preference VALUES (154, 433, 'Reactjs', true);
INSERT INTO public.preference VALUES (155, 433, 'High pressure enviroment', false);
INSERT INTO public.preference VALUES (156, 433, 'Dude culture', false);
INSERT INTO public.preference VALUES (157, 433, 'unsatisfying work ', false);
INSERT INTO public.preference VALUES (158, 435, 'Carmel swirl', true);
INSERT INTO public.preference VALUES (159, 435, 'Extra creamy', true);
INSERT INTO public.preference VALUES (160, 435, 'Chocolate chips/chunks', true);
INSERT INTO public.preference VALUES (161, 435, 'Hard Candy', false);
INSERT INTO public.preference VALUES (162, 435, 'Sherbert', false);
INSERT INTO public.preference VALUES (163, 435, 'Ice milk', false);
INSERT INTO public.preference VALUES (164, 438, 'Sweet and Savory', true);
INSERT INTO public.preference VALUES (165, 438, 'Malty ', true);
INSERT INTO public.preference VALUES (166, 438, 'Alcohol 9+', true);
INSERT INTO public.preference VALUES (167, 438, '50+ IBU', true);
INSERT INTO public.preference VALUES (168, 438, 'Nothing', false);
INSERT INTO public.preference VALUES (1119, 1016, 'Oysters', true);
INSERT INTO public.preference VALUES (976, 808, 'A fresh dube', true);
INSERT INTO public.preference VALUES (1124, 1016, 'Sun at night', false);
INSERT INTO public.preference VALUES (1125, 1016, 'Sand', false);
INSERT INTO public.preference VALUES (1126, 1016, 'Carpenters', true);
INSERT INTO public.preference VALUES (1127, 794, 'hard', true);
INSERT INTO public.preference VALUES (982, 808, 'A fresh Dube', true);
INSERT INTO public.preference VALUES (983, 808, 'Work', false);
INSERT INTO public.preference VALUES (1128, 794, 'smelly', false);
INSERT INTO public.preference VALUES (1129, 810, 'buy as soon as possible to save Nicole''s sanity', true);
INSERT INTO public.preference VALUES (986, 808, 'Bowling', true);
INSERT INTO public.preference VALUES (987, 808, 'white russians', true);
INSERT INTO public.preference VALUES (1130, 1016, 'Eggs', true);
INSERT INTO public.preference VALUES (1131, 578, 'Intelligent Script', true);
INSERT INTO public.preference VALUES (1132, 808, 'Facists', false);
INSERT INTO public.preference VALUES (994, 810, 'mostly hidden', true);
INSERT INTO public.preference VALUES (995, 810, 'cool looking', true);
INSERT INTO public.preference VALUES (997, 810, 'High upfront cost', false);
INSERT INTO public.preference VALUES (1137, 1020, 'hamachi', true);
INSERT INTO public.preference VALUES (1138, 1020, 'sea urchin', false);
INSERT INTO public.preference VALUES (1141, 794, 'Melts', true);
INSERT INTO public.preference VALUES (1142, 794, 'contains  caraway seeds, mold or spice that adds', true);
INSERT INTO public.preference VALUES (521, 568, 'Un-opininated', true);
INSERT INTO public.preference VALUES (522, 568, 'Self-explanatory error messages', true);
INSERT INTO public.preference VALUES (523, 568, 'restrictive data types', false);
INSERT INTO public.preference VALUES (546, 578, 'Good Story', true);
INSERT INTO public.preference VALUES (547, 578, 'Character developement', true);
INSERT INTO public.preference VALUES (548, 578, 'Great effects', true);
INSERT INTO public.preference VALUES (549, 578, 'great location', true);
INSERT INTO public.preference VALUES (550, 578, 'silly comedy', false);


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: lucky
--

INSERT INTO public.review VALUES (130, 794, 'Blue', 'https://www.britannica.com/topic/blue-cheese', '2024-02-06', 5, 'Blue is the best! My microbiome loves it.');
INSERT INTO public.review VALUES (131, 1016, 'Lucky Haskell', 'richardhaskell.dev', '2024-02-06', 1, 'Doesn''t like Oysters! Why is this guy in the running?');
INSERT INTO public.review VALUES (133, 808, 'Bodhisattva Bodayla ', 'https://en.wikipedia.org/wiki/Bodhisattva', '2024-02-16', 4, 'Actually, I think he works too much');
INSERT INTO public.review VALUES (135, 405, 'Eagle Creek', 'https://www.alltrails.com/trail/us/oregon/eagle-creek-trail', '2024-03-04', 4, 'This trail is one of the most scenic hike in the Columbia Gorge.  The creek has cut its way through solid rock in a narrow path that makes for great vistas. Swimming is cold and accessible only in a few places such as the a side trail near High bridge. Drinking water may also be challenging to find.

All Trails:
"Enjoy this 25.8-mile out-and-back trail near Cascade Locks, Oregon. Generally considered a challenging route, it takes an average of 12 h 27 min to complete. This is a very popular area for backpacking, camping, and hiking, so you''ll likely encounter other people while exploring. The best times to visit this trail are March through October." ');
INSERT INTO public.review VALUES (136, 405, 'Spyglass Ridge Loop Hike', 'https://www.oregonhikers.org/field_guide/Spyglass_Ridge_Loop_Hike', '2024-03-05', 0, 'Spyglass Ridge is a 73-acre west-facing hillside slope next to Taft High School managed by the Lincoln City Parks and Recreation Department. The forest here, with its canopy of Sitka spruce and western hemlock, is composed of younger trees, with large stumps the remnants of the old growth that was logged in the past. Some thinning has been done to open up the understory and allow the establishment of native wildflowers and shrubs. A loop trail leads around the property, with some central connector trails allowing for a shorter or longer exploration.

You’ll hike behind a gate on an old logging road. There’s a display here with a map of the park. To hike the perimeter, keep left at the first junction, and hike on a wide trail through an understory of salmonberry, blackberry, deer fern, sword fern, and salal. Ignore all user trails descending to the left. Stay left again and enter darker, denser woods before turning up the slope. Some debris from earlier thinning operations remains as habitat on the forest floor. The trail turns south near the crest of the ridge. A rooty side trail on the left takes you to the crest and a regenerating clearcut.

Descend from here to a junction, where you’ll keep left. Spring wildflowers may include trillium, candy flower, fairy lanterns, and false lily-of-the-valley, while foxglove blooms in the summer. Both evergreen and red huckleberry grow under the canopy. The path rises, narrows, and then winds down to a junction. Here, bear left, and wind up another slope. At the next junction, make a right to reach the crest and hike into a salmonberry thicket. You’ll reach a grassy clearing fringed by blackberry. Stay right where a trail leads out to Lee Avenue. A wide old road track descends the slope through a salal understory to reach the trailhead.');
INSERT INTO public.review VALUES (41, 438, 'Old Rasputin', 'https://northcoastbrewing.com/beers/', NULL, 0, 'The best readily vailable RIS on the West coast');
INSERT INTO public.review VALUES (45, 435, 'Chubby Hubby', 'https://www.benjerry.com/flavors/chubby-hubby-ice-cream', '2023-08-31', 4, 'Vanilla Malt Ice Cream with Peanutty Fudge-Covered Pretzels with Fudge & Peanut Buttery Swirls');
INSERT INTO public.review VALUES (48, 578, 'The Right Stuff', NULL, '2023-08-31', 5, 'Right something?');
INSERT INTO public.review VALUES (49, 578, 'Animal House', 'https://www.youtube.com/watch?v=UjgotlcHokA', '2023-09-11', 4, NULL);
INSERT INTO public.review VALUES (50, 578, 'Apocalypse Now', 'https://www.youtube.com/watch?v=9l-ViOOFH-s', '2023-09-11', 5, NULL);
INSERT INTO public.review VALUES (51, 578, 'Pulp Fiction', 'https://www.youtube.com/watch?v=tGpTpVyI_OQ', '2023-09-11', 5, NULL);
INSERT INTO public.review VALUES (52, 578, 'Bonnie and Clyde', 'https://www.youtube.com/watch?v=hZpm1zj9510', '2023-09-15', 5, 'Lots of Bullets');
INSERT INTO public.review VALUES (56, 808, 'Lucky Haskell', 'richardhaskell.dev', '2023-12-01', 4, 'This guy has the right attitude, and the right walk. He works too hard and only does gummies, but other wise He Is The Dude ');
INSERT INTO public.review VALUES (58, 568, 'Tanstack-Query v5', 'https://tanstack.com/query/latest', '2024-01-10', 3, 'Claims to take all the pain from server and front end data management, but my impression is that TQ just forward loads the pain. I found lots of info that worked for Queries, but little that worked well for mutations. TQ claim to be producing a tutorial "Later this year", but they said that last year.');
INSERT INTO public.review VALUES (138, 405, 'Saddle Mountain - AllTrails', 'https://www.alltrails.com/trail/us/oregon/saddle-mountain', '2024-03-13', 0, 'Length
4.7 mi
Elevation gain
1,794 ft
Route type
Out & back
Enjoy this 4.7-mile out-and-back trail near Seaside, Oregon. Generally considered a challenging route, it takes an average of 3 h 14 min to complete. This is a very popular area for hiking and running, so you''ll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome, but must be on a leash.

The highest point in northwest Oregon, this hike to the summit of Saddle Mountain provides a panorama of the Pacific Ocean on the Oregon coast, Astoria, the mouth of the Columbia River, Mt. St. Helens, Mt. Adams, Mt. Rainier, and Mt. Hood. The climb is especially popular in May and June, when wildflowers fill the mountain''s meadows with the richest floral display in the Coast Range.

Saddle Mountain Trail starts at an easy pace and begins to zig-zag after about one mile. The trail gets progressively steeper and more arduous as it progresses. Just before the saddle, it levels out before a descent between the two peaks. A steeper trail then takes you to the summit.

Hiking in groups is the best way to stay wildlife-safe along the Oregon Coast Range. This region is home to the densest population of mountain lions in Western Oregon, so stay on the trail. ');


--
-- Data for Name: checked; Type: TABLE DATA; Schema: public; Owner: lucky
--

INSERT INTO public.checked VALUES (9, 41, 165);
INSERT INTO public.checked VALUES (10, 41, 166);
INSERT INTO public.checked VALUES (11, 41, 167);
INSERT INTO public.checked VALUES (21, 48, 547);
INSERT INTO public.checked VALUES (22, 48, 549);
INSERT INTO public.checked VALUES (23, 48, 548);
INSERT INTO public.checked VALUES (24, 48, 546);
INSERT INTO public.checked VALUES (25, 48, 550);
INSERT INTO public.checked VALUES (26, 49, 550);
INSERT INTO public.checked VALUES (27, 49, 548);
INSERT INTO public.checked VALUES (28, 49, 547);
INSERT INTO public.checked VALUES (29, 49, 549);
INSERT INTO public.checked VALUES (30, 50, 546);
INSERT INTO public.checked VALUES (31, 50, 548);
INSERT INTO public.checked VALUES (32, 50, 547);
INSERT INTO public.checked VALUES (33, 50, 549);
INSERT INTO public.checked VALUES (34, 50, 550);
INSERT INTO public.checked VALUES (35, 51, 546);
INSERT INTO public.checked VALUES (36, 51, 547);
INSERT INTO public.checked VALUES (37, 52, 549);
INSERT INTO public.checked VALUES (38, 52, 547);
INSERT INTO public.checked VALUES (39, 52, 546);
INSERT INTO public.checked VALUES (46, 56, 986);
INSERT INTO public.checked VALUES (47, 56, 987);
INSERT INTO public.checked VALUES (70, 131, 1126);
INSERT INTO public.checked VALUES (71, 131, 1124);
INSERT INTO public.checked VALUES (74, 133, 987);
INSERT INTO public.checked VALUES (75, 133, 976);
INSERT INTO public.checked VALUES (76, 133, 982);
INSERT INTO public.checked VALUES (77, 133, 983);
INSERT INTO public.checked VALUES (78, 135, 112);
INSERT INTO public.checked VALUES (79, 135, 107);
INSERT INTO public.checked VALUES (80, 135, 106);
INSERT INTO public.checked VALUES (81, 135, 105);
INSERT INTO public.checked VALUES (82, 135, 113);


--
-- Data for Name: session__user; Type: TABLE DATA; Schema: public; Owner: lucky
--

INSERT INTO public.session__user VALUES ('988M7Mz06lb5TTQPpF8gLVJNsMXYRL1P', '{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-02T18:41:38.574Z","httpOnly":true,"path":"/"},"passport":{},"flash":{"success_msg1":["You have logged out."],"logged_status":["false"]}}', '2024-05-02 11:41:39');
INSERT INTO public.session__user VALUES ('u0mdFM9SA8hcTr1NGE50q7KoEuAwaIUJ', '{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-02T18:50:09.878Z","httpOnly":true,"path":"/"},"passport":{},"flash":{}}', '2024-05-02 11:50:10');
INSERT INTO public.session__user VALUES ('csGfOH-lI4lxkwF5OB6W5HlnVwDsVScR', '{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-02T17:46:45.894Z","httpOnly":true,"path":"/"},"passport":{},"flash":{"success_msg1":["You have logged out."]}}', '2024-05-02 10:46:46');
INSERT INTO public.session__user VALUES ('Cw1QAgXui1QXZwhKAo6BGhvYTMdCcndp', '{"cookie":{"originalMaxAge":2592000000,"expires":"2024-05-11T14:20:42.439Z","httpOnly":true,"path":"/"},"flash":{}}', '2024-05-11 07:21:35');


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lucky
--

SELECT pg_catalog.setval('public.category_id_seq', 1021, true);


--
-- Name: checked_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lucky
--

SELECT pg_catalog.setval('public.checked_id_seq', 85, true);


--
-- Name: preference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lucky
--

SELECT pg_catalog.setval('public.preference_id_seq', 1142, true);


--
-- Name: review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lucky
--

SELECT pg_catalog.setval('public.review_id_seq', 139, true);


--
-- PostgreSQL database dump complete
--

