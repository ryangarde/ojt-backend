export function joinStrings(strings: Array<string | undefined>, seperator: string = ', ') {
	return strings.filter((v) => !!v).join(seperator);
}

// export function getPatientAddress(patient: Patient) {
// 	if (!patient) return '';
// 	return [
// 		patient.street1,
// 		patient.street2,
// 		patient.barangay,
// 		patient.city,
// 		patient.state,
// 		patient.region,
// 		patient.country,
// 		patient.zip,
// 	]
// 		.filter((v) => !!v)
// 		.join(', ');
// }

// export function getPatientFullName(patient: Patient) {
// 	return [patient.first_name, patient.middle_name, patient.last_name].filter((v) => !!v).join(' ');
// }

// export function getDoctorFullName(doctor: Doctor) {
// 	return [doctor.first_name, doctor.middle_name, doctor.last_name].filter((v) => !!v).join(' ');
// }

export function getFullName(user: { FirstName: string; MiddleName: string; LastName: string; Suffix?: string } | undefined) {
	if (!user) return '';
	return [user.FirstName, user.MiddleName, user.LastName, user.Suffix].filter((v) => !!v).join(' ');
}

interface GetFullAddressProps {
	StreetVillage?: string;
	Barangay?: string;
	TownCity?: string;
	Province?: string;
	Region?: string;
	Country?: string;
	Zipcode?: string;
}

export function getFullAddress(user?: GetFullAddressProps) {
	if (!user) return '';
	return [user?.StreetVillage, user?.Barangay, user?.TownCity, user?.Province, user?.Region, user?.Country, user?.Zipcode]
		.filter((v) => !!v)
		.join(', ');
}

export function slugify(str?: string) {
	if (!str) return '';
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();

	var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
	var to = 'aaaaeeeeiiiioooouuuunc------';
	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	str = str
		.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
		.replace(/\s+/g, '-') // collapse whitespace and replace by -
		.replace(/-+/g, '-'); // collapse dashes

	return str;
}
