/*const ora = import('./node_modules/ora/index').then(ora => {

console.log(ora)
var spinner = ora().start();
spinner = ora().start();

setTimeout(() => {
	spinner.color = 'red';
	spinner.text = 'Loading rainbows';
	spinner.spinner = 'pong'
}, 1000);

})
*/
const prompts = require('prompts');
prompts.override(require('yargs').argv);


module.exports = {
	link: function link(){
(async () => {
	const response = await prompts([
	  {
		type: 'text',
		name: 'link',
		message: `Please enter your YouTube Downloadable media link`
	  },
	]);
	
	return response.link
  })();},

  fileformatin: async function fileformatin(){
			const response = await prompts([
				{
					type: 'select',
					name: 'fileformat',
					message: 'Please choose the file format in which you want the file to be saved',
					choices: [
					  { title: 'MP3', value: 'mp3' },
					  { title: 'MP4', value: 'mp4' },
					  { title: 'MKV', value: 'mkv' },
					  { title: 'AAC', value: 'aac' },
					  { title: 'FLAC', value: 'flac' },
					  { title: 'WAV', value: 'wav' },
					],
				  }
				  
			]);
			return response.fileformat
},

qualityprop: async function qualityprop(pathf){

	var response;
	if(pathf === 1){
		response = await prompts([
			{
				type: 'select',
				name: 'quality',
				message: 'Please insert the quality of which you want the file to be saved',
				choices: [
				  
				  { title: 'High', value: 'high' },
				  { title: 'Greatest', value: 'greatest' },
				],
			  }
			  
		]);
	}
	else if(pathf === 0){
		response = await prompts([
			{
				type: 'select',
				name: 'quality',
				message: 'Please insert the quality of which you want the file to be saved',
				choices: [
				  
				  { title: 'High', value: 'high' },
				  { title: 'Low', value: 'low' },
				],
			  }
			  
		]);
	}

	return response.quality
	
}

}