let express = require('express');
const cors = require('cors');
var knex = require('../config/knex');
const multer = require('multer');
const path = require('path');
const { start } = require('repl');

const router = express.Router();
router.use(cors());
// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './filePDF'); // Ensure this directory exists
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/get_userall', async function(req, res, next) {
    try {
        let data = await knex.knex('user').select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_user_byid', async function(req, res, next) {
    try {
        let data = await knex.knex('user').where({ id:req.body.id }).select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/add_userdetails', async function(req, res, next) {
    try {
        console.log(req.body)
        let data = await knex.knex('user').insert({user_id:req.body.user_id, user_name: req.body.user_name, password: req.body.password, user_type: req.body.user_type});
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/update_userdetails', async function(req, res, next) {
    try {
        let data = await knex.knex('user').where({ id: req.body.id }).update({ 
            national: req.body.national, 
            status_t: req.body.status_t,
            name: req.body.name,
            birthdate: req.body.birthdate,
            blood_group: req.body.blood_group,
            nationality: req.body.nationality,
            ethnicity: req.body.ethnicity,
            tp_number: req.body.tp_number,
            email: req.body.email,
            date_entry: req.body.date_entry,
            retirement: req.body.retirement,
            username: req.body.username,
            password: req.body.password,
            user_status: req.body.user_status

         });
        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/dalete_userdetails', async function(req, res, next) {
    try {
        let data = await knex.knex('user').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/loginCheck', async function(req, res, next) {
    try {
        let data = await knex.knex('user').where({ username: req.body.username , password: req.body.password}).select('user_id','user_status' ,'id','name' ,'date_entry');
        if (data.length > 0) {
            res.status(200).json({ status: 'ok', message: 'Logged in', user_id: data[0].user_id ,user_status:data[0].user_status,id:data[0].id ,name:data[0].name,date_entry:data[0].date_entry});
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});
router.post('/get_child_byuser_id', async function(req, res, next) {
    try {
        let data = await knex.knex('Child').where({ user_id:req.body.user_id }).select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_under_byuser_id', async function(req, res, next) {
    try {
        let data = await knex.knex('under').where({ user_id:req.body.user_id }).select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_positions_byuser_id', async function(req, res, next) {
    try {
        let data = await knex.knex('positions').where({ user_id:req.body.user_id }).select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_management_byuser_id', async function(req, res, next) {
    try {
        let data = await knex.knex('management').where({ user_id:req.body.user_id }).select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_educational_byuser_id', async function(req, res, next) {
    try {
        let data = await knex.knex('educational').where({ user_id:req.body.user_id }).select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_contract_byuser_id', async function(req, res, next) {
    try {
        let data = await knex.knex('contract').where({ user_id:req.body.user_id }).select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_otherwork_byuser_id', async function(req, res, next) {
    try {
        let data = await knex.knex('otherwork').where({ user_id:req.body.user_id }).select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_financial_byuser_id', async function(req, res, next) {
    try {
        let data = await knex.knex('financial').where({ user_id:req.body.user_id }).select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_annualtax_byuser_id', async function(req, res, next) {
    try {
        let data = await knex.knex('annualtax').where({ user_id:req.body.user_id }).select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_insignia_byuser_id', async function(req, res, next) {
    try {
        let data = await knex.knex('insignia').where({ user_id:req.body.user_id }).select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_assessment_byuser_id', async function(req, res, next) {
    try {
        let data = await knex.knex('assessment').where({ user_id:req.body.user_id }).select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_activitylog_byuser_id', async function(req, res, next) {
    try {
        let data = await knex.knex('activity').where({ user_id:req.body.user_id }).select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/update_address', async function(req, res, next) {
    try {
        let data = await knex.knex('user').where({ id: req.body.id }).update({ 
            housenum_o: req.body.housenum_o, 
            village_o: req.body.village_o, 
            villagename_o: req.body.villagename_o,
            alley_o: req.body.alley_o, 
            road_o: req.body.road_o, 
            district_o: req.body.district_o,
            prefecture_o: req.body.prefecture_o, 
            province_o: req.body.province_o, 
            zipcode_o: req.body.zipcode_o,
            housenum_a: req.body.housenum_a, 
            village_a: req.body.village_a, 
            villagename_a: req.body.villagename_a,
            alley_a: req.body.alley_a, 
            road_a: req.body.road_a, 
            district_a: req.body.district_a,
            prefecture_a: req.body.prefecture_a, 
            province_a: req.body.province_a, 
            zipcode_a: req.body.zipcode_a});
        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/update_fmname', async function(req, res, next) {
    try {
        let data = await knex.knex('user').where({ id: req.body.id }).update({ 
            national_f: req.body.national_f, 
            name_f: req.body.name_f, 
            status_f: req.body.status_f,
            income_f: req.body.income_f, 
            occupation_f: req.body.occupation_f, 
            national_m: req.body.national_m,
            name_m: req.body.name_m, 
            status_m: req.body.status_m, 
            income_m: req.body.income_m,
            occupation_m: req.body.occupation_m
        });
        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/update_spouse', async function(req, res, next) {
    try {
        let data = await knex.knex('user').where({ id: req.body.id }).update({ 
            status_t: req.body.status_t, 
            name_t: req.body.name_t, 
            age_t: req.body.age_t, 
            telephone_t: req.body.telephone_t,
            occupation_t: req.body.occupation_t
        });
        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/add_child', async function(req, res, next) {
    try {
        console.log(req.body)
        let data = await knex.knex('child').insert({
            user_id:req.body.user_id,
            name_c: req.body.name_c,
            age_c: req.body.age_c,
            occupation_c: req.body.occupation_c});
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/dalete_child', async function(req, res, next) {
    try {
        let data = await knex.knex('child').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/dalete_activitylog', async function(req, res, next) {
    try {
        let data = await knex.knex('activity').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/dalete_otherwork', async function(req, res, next) {
    try {
        let data = await knex.knex('otherwork').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/dalete_under', async function(req, res, next) {
    try {
        let data = await knex.knex('under').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/dalete_positions', async function(req, res, next) {
    try {
        let data = await knex.knex('positions').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/add_activitylog', upload.single('doc_file'), async function(req, res, next) {
    try {
        let docFileName = '';
        let docFilePath = '';

        if (req.file) {
            docFileName = req.file.originalname;
            docFilePath = req.file.path; // or store the path relative to a specific directory
        }
        let data = await knex.knex('activity').insert({
            user_id: req.body.user_id,
            section_ac: req.body.section_ac,
            date_ac: req.body.date_ac,
            doc_name: docFileName,
            doc_file: docFilePath, // Storing the path of the uploaded file
            reveal_ac: req.body.reveal_ac,
        });

        res.json(data);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});
router.post('/add_otherwork', async function(req, res, next) {
    try {
        console.log(req.body)
        let data = await knex.knex('otherwork').insert({
            user_id:req.body.user_id,
            positiono_w: req.body.positiono_w,
            detailso_w: req.body.detailso_w,
            companyo_w: req.body.companyo_w,
            periodso_w: req.body.periodso_w,
            periodeo_w: req.body.periodeo_w,
        });
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/update_otherwork', async function(req, res, next) {
    try {
        let data = await knex.knex('otherwork').where({ id: req.body.id }).update({ 
            positiono_w: req.body.positiono_w, 
            detailso_w: req.body.detailso_w, 
            companyo_w: req.body.companyo_w,
            periodso_w: req.body.periodso_w, 
            periodeo_w: req.body.periodeo_w
        });
        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/update_educational', async function(req, res, next) {
    try {
        let data = await knex.knex('educational').where({ id: req.body.id }).update({ 
            qualification_e: req.body.qualification_e, 
            course_e: req.body.course_e, 
            study_e: req.body.study_e,
            group_e: req.body.group_e, 
            educational_e: req.body.educational_e,
            type_e: req.body.type_e
        });
        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/update_under', async function(req, res, next) {
    try {
        let data = await knex.knex('under').where({ id: req.body.id }).update({ 
            type_u: req.body.type_u, 
            affiliation_u: req.body.affiliation_u, 
            periods_u: req.body.periods_u,
            periode_u: req.body.periode_u, 
            status_u: req.body.status_u
        });
        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/add_under', async function(req, res, next) {
    try {
        console.log(req.body)
        let data = await knex.knex('under').insert({
            user_id:req.body.user_id,
            type_u: req.body.type_u, 
            affiliation_u: req.body.affiliation_u, 
            periods_u: req.body.periods_u,
            periode_u: req.body.periode_u, 
            status_u: req.body.status_u
        });
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/add_positions', async function(req, res, next) {
    try {
        console.log(req.body)
        let data = await knex.knex('positions').insert({
            user_id:req.body.user_id,
            position_p: req.body.position_p, 
            personnel_p: req.body.personnel_p,
            worktype_p: req.body.worktype_p,
            positiona_p: req.body.positiona_p,
            positionlevel_p: req.body.positionlevel_p, 
            periods_p: req.body.periods_p,
            periode_p: req.body.periode_p,
            statusp_p: req.body.statusp_p, 
            status_p: req.body.status_p
        });
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/update_positions', async function(req, res, next) {
    try {
        let data = await knex.knex('positions').where({ id: req.body.id }).update({ 
            position_p: req.body.position_p, 
            personnel_p: req.body.personnel_p,
            worktype_p: req.body.worktype_p,
            positiona_p: req.body.positiona_p,
            positionlevel_p: req.body.positionlevel_p, 
            periods_p: req.body.periods_p,
            periode_p: req.body.periode_p,
            statusp_p: req.body.statusp_p, 
            status_p: req.body.status_p
        });
        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/dalete_management', async function(req, res, next) {
    try {
        let data = await knex.knex('management').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/add_management', async function(req, res, next) {
    try {
        console.log(req.body)
        let data = await knex.knex('management').insert({
            user_id:req.body.user_id,
            position_m: req.body.position_m, 
            periods_m: req.body.periods_m, 
            periode_m: req.body.periode_m,
            status_m: req.body.status_m
        });
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/update_management', async function(req, res, next) {
    try {
        let data = await knex.knex('management').where({ id: req.body.id }).update({ 
            position_m: req.body.position_m, 
            periods_m: req.body.periods_m, 
            periode_m: req.body.periode_m,
            status_m: req.body.status_m
        });
        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/dalete_educational', async function(req, res, next) {
    try {
        let data = await knex.knex('educational').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/add_educational', async function(req, res, next) {
    try {
        console.log(req.body)
        let data = await knex.knex('educational').insert({
            user_id:req.body.user_id,
            qualification_e: req.body.qualification_e, 
            course_e: req.body.course_e, 
            study_e: req.body.study_e,
            group_e: req.body.group_e, 
            educational_e: req.body.educational_e,
            type_e: req.body.type_e
        });
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/add_contract', upload.single('doc_file'), async function(req, res, next) {
    try {
        // Assuming 'doc_file' is the name attribute in your form's file input
        // Now 'req.file' is the uploaded file information and 'req.body' contains the text fields

        // File path can be stored or used as needed. Example:
        let docFileName = '';
        let docFilePath = '';

        if (req.file) {
            docFileName = req.file.originalname;
            docFilePath = req.file.path; // or store the path relative to a specific directory
        }

        let data = await knex.knex('contract').insert({
            user_id: req.body.user_id,
            cositionc_o: req.body.cositionc_o,
            personnelc_o: req.body.personnelc_o,
            jobc_o: req.body.jobc_o,
            orderc_o: req.body.orderc_o,
            periodsc_o: req.body.periodsc_o,
            periodec_o: req.body.periodec_o,
            statusc_o: req.body.statusc_o,
            doc_name: docFileName,
            doc_file: docFilePath // Storing the path of the uploaded file
        });

        res.json(data);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});
router.post('/dalete_contract', async function(req, res, next) {
    try {
        let data = await knex.knex('contract').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/update_contract', upload.single('doc_file'), async function(req, res, next) {
    try {
        let updateData = {
            cositionc_o: req.body.cositionc_o,
            personnelc_o: req.body.personnelc_o,
            jobc_o: req.body.jobc_o,
            orderc_o: req.body.orderc_o,
            periodsc_o: req.body.periodsc_o,
            periodec_o: req.body.periodec_o,
            statusc_o: req.body.statusc_o
        };

        // ถ้ามีไฟล์ถูกอัปโหลด เพิ่มชื่อไฟล์และที่อยู่ไฟล์ลงในข้อมูลที่จะอัปเดต
        if (req.file) {
            updateData.doc_name = req.file.originalname;
            updateData.doc_file = req.file.path;
        }

        let data = await knex.knex('contract').where({ id: req.body.id }).update(updateData);

        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/dalete_otherwork', async function(req, res, next) {
    try {
        let data = await knex.knex('otherwork').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/add_otherwork', async function(req, res, next) {
    try {
        console.log(req.body)
        let data = await knex.knex('otherwork').insert({
            user_id:req.body.user_id,
            positiono_w: req.body.positiono_w, 
            detailso_w: req.body.detailso_w, 
            companyo_w: req.body.companyo_w,
            periodso_w: req.body.periodso_w, 
            periodeo_w: req.body.periodeo_w
        });
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/update_otherwork', async function(req, res, next) {
    try {
        let data = await knex.knex('otherwork').where({ id: req.body.id }).update({ 
            positiono_w: req.body.positiono_w, 
            detailso_w: req.body.detailso_w, 
            companyo_w: req.body.companyo_w,
            periodso_w: req.body.periodso_w, 
            periodeo_w: req.body.periodeo_w
        });
        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/dalete_financial', async function(req, res, next) {
    try {
        let data = await knex.knex('financial').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/add_financial', upload.single('doc_file'), async function(req, res, next) {
    try {
        let docFileName = '';
        let docFilePath = '';

        if (req.file) {
            docFileName = req.file.originalname;
            docFilePath = req.file.path; // or store the path relative to a specific directory
        }

        let data = await knex.knex('financial').insert({
            user_id: req.body.user_id,
            paymentf_i: req.body.paymentf_i,
            incomef_i: req.body.incomef_i,
            expensesf_i: req.body.expensesf_i,
            netf_i: req.body.netf_i,
            statusf_i: req.body.statusf_i,
            salaryf_i: req.body.salaryf_i,
            doc_name: docFileName,
            doc_file: docFilePath
        });

        res.json(data);
    } catch (error) {
        console.error(error);
        // Handle error appropriately, e.g., clean up temporary files
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/update_financial', upload.single('doc_file'), async function(req, res, next) {
    try {
        let updateData = {
            paymentf_i: req.body.paymentf_i,
            incomef_i: req.body.incomef_i,
            expensesf_i: req.body.expensesf_i,
            netf_i: req.body.netf_i,
            statusf_i: req.body.statusf_i,
            salaryf_i: req.body.salaryf_i,
        };

        // ถ้ามีไฟล์ถูกอัปโหลด เพิ่มชื่อไฟล์และที่อยู่ไฟล์ลงในข้อมูลที่จะอัปเดต
        if (req.file) {
            updateData.doc_name = req.file.originalname;
            updateData.doc_file = req.file.path;
        }

        let data = await knex.knex('financial').where({ id: req.body.id }).update(updateData);

        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/dalete_annualtax', async function(req, res, next) {
    try {
        let data = await knex.knex('annualtax').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/add_annualtax', upload.single('doc_file'), async function(req, res, next) {
    try {
        let docFileName = '';
        let docFilePath = '';

        if (req.file) {
            docFileName = req.file.originalname;
            docFilePath = req.file.path; // or store the path relative to a specific directory
        }

        let data = await knex.knex('annualtax').insert({
            user_id: req.body.user_id,
            tax_a: req.body.tax_a,
            amount_a: req.body.amount_a,
            deducted_a: req.body.deducted_a,
            fund_a: req.body.fund_a,
            social_a: req.body.social_a,
            provident_a: req.body.provident_a,
            volume_a: req.body.volume_a,
            doc_name: docFileName,
            doc_file: docFilePath
        });

        res.json(data);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});
router.post('/update_annualtax', upload.single('doc_file'), async function(req, res, next) {
    try {
        let updateData = {
            tax_a: req.body.tax_a,
            amount_a: req.body.amount_a,
            deducted_a: req.body.deducted_a,
            fund_a: req.body.fund_a,
            social_a: req.body.social_a,
            provident_a: req.body.provident_a,
            volume_a: req.body.volume_a
        };

        // ถ้ามีไฟล์ถูกอัปโหลด เพิ่มชื่อไฟล์และที่อยู่ไฟล์ลงในข้อมูลที่จะอัปเดต
        if (req.file) {
            updateData.doc_name = req.file.originalname;
            updateData.doc_file = req.file.path;
        }

        let data = await knex.knex('annualtax').where({ id: req.body.id }).update(updateData);

        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/dalete_insignia', async function(req, res, next) {
    try {
        let data = await knex.knex('insignia').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/add_insignia', async function(req, res, next) {
    try {
        console.log(req.body)
        let data = await knex.knex('insignia').insert({
            user_id:req.body.user_id,
            royal_i: req.body.royal_i, 
            initials_i: req.body.initials_i, 
            year_i: req.body.year_i,
            status_i: req.body.status_i
        });
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/update_insignia', async function(req, res, next) {
    try {
        let data = await knex.knex('insignia').where({ id: req.body.id }).update({ 
            royal_i: req.body.royal_i, 
            initials_i: req.body.initials_i, 
            year_i: req.body.year_i,
            status_i: req.body.status_i
        });
        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/dalete_assessment', async function(req, res, next) {
    try {
        let data = await knex.knex('assessment').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/add_assessment', async function(req, res, next) {
    try {
        console.log(req.body)
        let data = await knex.knex('assessment').insert({
            user_id:req.body.user_id,
            evaluation_as: req.body.evaluation_as, 
            level_as: req.body.level_as, 
            score_as: req.body.score_as,
            percentage_as: req.body.percentage_as
        });
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/update_assessment', async function(req, res, next) {
    try {
        let data = await knex.knex('assessment').where({ id: req.body.id }).update({ 
            evaluation_as: req.body.evaluation_as, 
            level_as: req.body.level_as, 
            score_as: req.body.score_as,
            percentage_as: req.body.percentage_as
        });
        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/update_activitylog', upload.single('doc_file'), async function(req, res, next) {
    try {
        let updateData = {
            section_ac: req.body.section_ac,
            date_ac: req.body.date_ac,
            reveal_ac: req.body.reveal_ac
        };

        // ถ้ามีไฟล์ถูกอัปโหลด เพิ่มชื่อไฟล์และที่อยู่ไฟล์ลงในข้อมูลที่จะอัปเดต
        if (req.file) {
            updateData.doc_name = req.file.originalname;
            updateData.doc_file = req.file.path;
        }

        let data = await knex.knex('activity').where({ id: req.body.id }).update(updateData);

        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/add_user', async function(req, res, next) {
    try {
        console.log(req.body)
        let data = await knex.knex('user').insert({
            national: req.body.national, 
            name: req.body.name, 
            tp_number: req.body.tp_number,
            username: req.body.username, 
            password: req.body.password,
            user_status: req.body.user_status
        });
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/dalete_user', async function(req, res, next) {
    try {
        let data = await knex.knex('user').where({ id: req.body.user_id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/delete_data', async function(req, res, next) {
    const tables = ['user', 'under', 'positions', 'otherwork', 'management', 'insignia', 'financial', 'educational', 'contract', 'child', 'assessment', 'annualtax', 'activity'];
    // Start a transaction
    try {
        await knex.knex.transaction(async trx => {
            for (const table of tables) {
                if (table === 'user'){
                    await trx(table).where({ id: req.body.user_id }).del();
                }else{
                await trx(table).where({ user_id: req.body.user_id }).del();
                }
            }
            // If all deletions succeed, send a success response
            res.json({ message: 'Delete successful' });
        });
    } catch (error) {
        // If any deletion fails, the transaction is rolled back and an error is returned
        res.status(500).json({ error: error.message });
    }
});
router.get('/get_insigniaall', async function(req, res, next) {
    try {
        let data = await knex.knex('insignia')
            .join('user', 'insignia.user_id', '=', 'user.id')
            .select('insignia.*', 'user.name as userName');
        res.json(data);
    } catch (error) {
        console.error(error); // Log the error for server-side debugging
        res.status(500).json({ message: 'An error occurred while fetching assessments.' });
    }
});
router.post('/add_timestamp', async function(req, res, next) {
    try {
        console.log(req.body)
        let data = await knex.knex('timestamp').insert({
            user_id:req.body.user_id,
            date_tt: req.body.date_tt,
            times_tt: req.body.times_tt,
            timee_tt: req.body.timee_tt
        });
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_timestamp', async function(req, res, next) {
    try {
        let data = await knex.knex('timestamp').where({ user_id:req.body.user_id }).select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/update_timestamp', async function(req, res, next) {
    try {
        if (!req.body.date_tt || !req.body.timee_tt || !req.body.user_id ) {
            return res.status(400).json({ error: 'Missing date_tt or timee_tt in request body' });
        }

        // ตรวจสอบการมีอยู่ของ record ที่มี date_tt ที่ระบุ
        let record = await knex.knex('timestamp').where({ date_tt: req.body.date_tt , user_id: req.body.user_id }).first();

        if (!record) {
            return res.status(404).json({ error: 'Record not found for the given date_tt' });
        }

        // ทำการอัพเดทค่า timee_tt สำหรับ record ที่พบ
        let data = await knex.knex('timestamp').where({ date_tt: req.body.date_tt , user_id: req.body.user_id}).update({ 
            timee_tt: req.body.timee_tt
        });

        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.post('/get_timestamp_byuser_id', async function(req, res, next) {
    try {
        let data = await knex.knex('timestamp').where({ user_id:req.body.user_id }).select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.get('/get_timestamp', async function(req, res, next) {
    try {
        let data = await knex.knex('timestamp')
            .join('user', 'timestamp.user_id', '=', 'user.id')
            .select('timestamp.*', 'user.name as userName');
        res.json(data);
    } catch (error) {
        console.error(error); // Log the error for server-side debugging
        res.status(500).json({ message: 'An error occurred while fetching assessments.' });
    }
});
router.post('/add_vacation', async function(req, res, next) {
    try {
        console.log(req.body)
        let data = await knex.knex('vacation').insert({
            user_id:req.body.user_id,
            date_vt: req.body.date_vt,
            name_vt: req.body.name_vt,
            position: req.body.position,
            affiliation:req.body.affiliation,
            dates_vt: req.body.dates_vt,
            datee_vt: req.body.datee_vt,
            total_day: req.body.total_day,
            contact: req.body.contact,
            assigned: req.body.assigned,
            type_vt: req.body.type_vt,
            status: req.body.status
        });
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_vacation', async function(req, res, next) {
    try {
        let data = await knex.knex('vacation')
        .where({ user_id: req.body.user_id, type_vt: 'ลาพักผ่อน', status: 'รอดำเนินการ' })
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_vacation2', async function(req, res, next) {
    try {
        let data = await knex.knex('vacation')
            .where({ user_id: req.body.user_id , status: 'รอดำเนินการ'})
            .whereNot({ type_vt: 'ลาพักผ่อน' });
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_vacation3', async function(req, res, next) {
    try {
        let data = await knex.knex('vacation')
            .where({ user_id: req.body.user_id })
            .whereIn('status', ['เสร็จสิ้น', 'ยกเลิกเสร็จสิ้น']);
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/get_vacation4', async function(req, res, next) {
    try {
        let data = await knex.knex('vacation')
            .where({ user_id: req.body.user_id })
            .whereIn('status', ['รอยกเลิกวันลา']);
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/update_status', async function(req, res, next) {
    try {
        // Assuming you have a table named 'vacation_requests' to store leave requests
        let data = await knex.knex('vacation')
            .where({ id: req.body.id }) // Assuming 'id' is the primary key of your leave request
            .update({ status: req.body.status }); // Update 'status' field

        res.json({ status: 'ok', message: 'Leave request status updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating leave request status' });
    }
});
router.post('/get_vacation5', async function(req, res, next) {
    try {
        let data = await knex.knex('vacation')
            .where({ user_id: req.body.user_id })
            .whereIn('status', ['รอดำเนินการ']);
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/approve_vacation', async function(req, res, next) {
    try {
        // Assuming you have a table named 'vacation' to store leave requests
        let data = await knex.knex('vacation')
            .where({ id: req.body.child_id }) // Assuming 'child_id' is the primary key of your leave request
            .update({ status: req.body.status }); // Update 'status' field

        res.json({ status: 'ok', message: 'Leave request status updated successfully', updatedRows: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating leave request status' });
    }
});
router.get('/get_vacationall', async function(req, res, next) {
    try {
        let data = await knex.knex('vacation').select().where('status', 'รอดำเนินการ');
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.get('/get_vacationall2', async function(req, res, next) {
    try {
        let data = await knex.knex('vacation').select().where('status', 'รอยกเลิกวันลา');
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.get('/get_vacationall3', async function(req, res, next) {
    try {
        let data = await knex.knex('vacation').select().where('status', 'เสร็จสิ้น').orWhere('status', 'ยกเลิกเสร็จสิ้น');
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/dalete_dictation', async function(req, res, next) {
    try {
        let data = await knex.knex('dictation').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.get('/get_dictation', async function(req, res, next) {
    try {
        let data = await knex.knex('dictation').select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/add_dictation', upload.single('doc_file'), async function(req, res, next) {
    try {
        // Assuming 'doc_file' is the name attribute in your form's file input
        // Now 'req.file' is the uploaded file information and 'req.body' contains the text fields

        // File path can be stored or used as needed. Example:
        let docFileName = '';
        let docFilePath = '';

        if (req.file) {
            docFileName = req.file.originalname;
            docFilePath = req.file.path; // or store the path relative to a specific directory
        }

        let data = await knex.knex('dictation').insert({
            user_id: req.body.user_id,
            number_or: req.body.number_or,
            section: req.body.section,
            date_dt: req.body.date_dt,
            doc_name: docFileName,
            doc_file: docFilePath // Storing the path of the uploaded file
        });

        res.json(data);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});
router.post('/update_dictation', upload.single('doc_file'), async function(req, res, next) {
    try {
        let updateData = {
            number_or: req.body.number_or,
            section: req.body.section,
            date_dt: req.body.date_dt,
        };

        // ถ้ามีไฟล์ถูกอัปโหลด เพิ่มชื่อไฟล์และที่อยู่ไฟล์ลงในข้อมูลที่จะอัปเดต
        if (req.file) {
            updateData.doc_name = req.file.originalname;
            updateData.doc_file = req.file.path;
        }

        let data = await knex.knex('dictation').where({ id: req.body.id }).update(updateData);

        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
router.get('/get_law', async function(req, res, next) {
    try {
        let data = await knex.knex('law').select();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/dalete_law', async function(req, res, next) {
    try {
        let data = await knex.knex('law').where({ id: req.body.id }).del();
        res.json(data);
    } catch (error) {
        res.json(error);
    }
});
router.post('/add_law', upload.single('doc_file'), async function(req, res, next) {
    try {
        // Assuming 'doc_file' is the name attribute in your form's file input
        // Now 'req.file' is the uploaded file information and 'req.body' contains the text fields

        // File path can be stored or used as needed. Example:
        let docFileName = '';
        let docFilePath = '';

        if (req.file) {
            docFileName = req.file.originalname;
            docFilePath = req.file.path; // or store the path relative to a specific directory
        }

        let data = await knex.knex('law').insert({
            user_id: req.body.user_id,
            date_law: req.body.date_law,
            name_law: req.body.name_law,
            doc_name: docFileName,
            doc_file: docFilePath // Storing the path of the uploaded file
        });

        res.json(data);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});
router.post('/update_law', upload.single('doc_file'), async function(req, res, next) {
    try {
        let updateData = {
            date_law: req.body.date_law,
            name_law: req.body.name_law
        };

        // ถ้ามีไฟล์ถูกอัปโหลด เพิ่มชื่อไฟล์และที่อยู่ไฟล์ลงในข้อมูลที่จะอัปเดต
        if (req.file) {
            updateData.doc_name = req.file.originalname;
            updateData.doc_file = req.file.path;
        }

        let data = await knex.knex('law').where({ id: req.body.id }).update(updateData);

        res.json({ status: 'ok', message: 'User details updated successfully', updatedRows: data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
});
module.exports = router;