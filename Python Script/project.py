from itertools import islice
import sys
import re

class tcpdump:
	"""A class that store user inputs from command line arguments and parsed data from member functions"""
	def __init__(self):
		self.source_ip = None #store source IP from aruguments
		self.destin_ip = None #store destination IP from aruguments
		self.option = None #store sorting option from aruguments
		self.file_name = None #store file name from aruguments
		self.ip_addresses = [] #store results by parsing a file
		self.packet_size = 0 #total number of packet_size
		self.num_ip = 0 #a number of IPs user provides
	def check_ips(self, parts):
		"""This function checks if a format of IPs is valid or invalid
		   If IP(s) are/is valid, store them in member variables and return True. If not, return False"""
		   
		#A format of IP should have 4 parts with 3 digit integers separated by a dot. Each part has a range from 0 to 255
		for part in parts:
			try:
				if eval(part) < 0 or eval(part) > 255:
					return False
			except:
				return False
				
		#One IP is found from the argument but no IP has been added to the class so far. Then add it as source IP			
		if self.num_ip == 0:
			self.source_ip = parts[0] + "." + parts[1] + "." + parts[2] + "." + parts[3]
			self.num_ip = self.num_ip + 1
		#One IP is found from the argument and one IP has been already added to the class so far. Then add it as destination IP			
		elif self.num_ip == 1:
			self.destin_ip = parts[0] + "." + parts[1] + "." + parts[2] + "." + parts[3]
			self.num_ip = self.num_ip + 1
		return True

	def check_options(self, option):
		"""This function checks if user provides an option for sorting or not"""
		
		#checks if "-s" exists in one of command line aruguments
		#If yes, store True to a member variable. If not, store False to the variable
		if "-s" in option:
			self.option = True
		else:
			self.option = False
			
	def check_filename(self, name):
		"""This function finds a name of a text file from the aruguments"""
		
		#if a name of a file provided by user contains a extension as "txt", save the file name in a member variable
		if "txt" in name:
			tcp.file_name = name[0] + "." + name[1]
			return True
			
	def parse_file(self, file_name):
		"""This function is to parse a file called tcpdump_file.txt with differenc choices of source and destination IPs from user"""
		
		#Uses Try except to find exception mainly for FileNotFoundError
		try :
			#Store all lists of source and destination Ips and packet size
			ips = []
			#Store one list of source and destination Ips and packet size fro ips
			ip = []
			file_object = open(self.file_name,"r")
			information = file_object.readlines()
			file_object.close()
			#This for loop is a process of finding all source and destination IPs and packet sizes and forming a list containing each set of data
			for line in information:
				#use of islice and finditer functions with for loop is to find IPs by this regex with limited number of results, meaning I want only first 2 IPs
				for i in islice(re.finditer(r'[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}', line), 2):
					ip.append((i.group()))
				#packet size is shown at the end of each line, so regex to find "length integer" format is used right after
				mixed = re.findall(r'\blength\s[0-9]+', line)
				#In case IP is not found from above process. Then below steps are unnecessary
				if ip:
					#if length is not provided from the line
					if len(mixed) == 0:
						length = 0
					else:
						getLength = mixed[0].split(" ");
						#split by white space and value at index 1 is the actual value of a packet size
						length = getLength[1]
	
					ip.append(int(length))
					ips.append(ip)
					
				ip = []
			#if user provided one IP		
			if self.source_ip != None:
				#This for loop is to compare each set of information in ips with IPs provided by user 
				for ip in ips:
					#Store boolean if identical IPs are found during the process
					check_exist = False
					#if user provided two IPs
					if self.destin_ip != None and len(ip) == 3:
						#Checking provided Ips match with IPs from the list
						if self.source_ip in ip[0] and self.destin_ip in ip[1]:
							#It is not necessary saving identical data multiple times, so it only saves data when self.ip_addresses is empty
							#After that, packet size is only updated
							if self.ip_addresses:
								self.ip_addresses[0][-1] = self.ip_addresses[0][-1] + ip[-1] #ip[-1] means the last index in the list
							else:
								self.ip_addresses.append(ip)
							
							self.packet_size = self.packet_size + ip[-1] #keep on adding packet size
					#if only one IP is provided and it matches with source IP from the list
					elif self.source_ip in ip[0]:
						#Similar to above process. We do not need to save same data over again.
						#Loop self.ip_addresses and if there is a identical set of IPs, then just update the packet size and set True on check_exist
						#New set of data will be added only if check_exist is set as False
						if self.ip_addresses: #If the list is not empty
							for exist in self.ip_addresses:
								if len(ip) == 3 and ip[0] in exist and ip[1] in exist:
									exist[-1] = exist[-1] + ip[-1]
									check_exist = True
									break
								elif len(ip) == 2 and ip[0] in exist:
									exist[-1] = exist[-1] + ip[-1]
									check_exist = True
									break
							if not check_exist:
								self.ip_addresses.append(ip)
							self.packet_size = self.packet_size + ip[-1]
						else:
							self.ip_addresses.append(ip)
							self.packet_size = self.packet_size + ip[-1]
			#If user does not provide any IP
			else:
				#This for loop is to go over all sets of data and avoid saving identical data in self.ip_addresses but update packet size only
				for ip in ips:
					check_exist = False
					if self.ip_addresses:
						for exist in self.ip_addresses:
							if len(ip) == 3 and ip[0] in exist and ip[1] in exist:
								exist[-1] = exist[-1] + ip[-1]
								check_exist = True
								break
							elif len(ip) == 2 and ip[0] in exist:
								exist[-1] = exist[-1] + ip[-1]
								check_exist = True
								break
						if not check_exist:
							self.ip_addresses.append(ip)
						self.packet_size = self.packet_size + ip[-1]
					else:
						self.ip_addresses.append(ip)
						self.packet_size = self.packet_size + ip[-1]
					
			return True
		except FileNotFoundError:
			return False
		return False
		
	def sort_list(self):
		"""This function sorts a list of result in descending order using selection sort"""
		for index in range(len(self.ip_addresses)-1,0,-1):
			indexMax=0
			for index2 in range(1,index+1):
				if self.ip_addresses[index2][-1] < self.ip_addresses[indexMax][-1]:
				   indexMax = index2

			temp = self.ip_addresses[index]
			self.ip_addresses[index] = self.ip_addresses[indexMax]
			self.ip_addresses[indexMax] = temp
			
	def print_list(self):
		"""This function calls sort_list() function depeding on boolean in self.option and writes in a file with results"""
		if self.option == True:
			self.sort_list()
	
		for i in self.ip_addresses:
			if len(i) == 2: #there are few sets of data having only source IP
				print("source:", i[0], "\ttotal:", str(i[-1]))
			else:
				print("source:", i[0], "\tdest:", i[1], "\ttotal:", str(i[-1]))
#End of class

"""A part for testing"""
#Check if size of command line argument is less then 2
if len(sys.argv) == 1:
    print("There is no command line argument")
else:
	#create an object
	tcp = tcpdump()
	valid = True
	tcp.check_options(sys.argv)
	#Delete "-s" from the aruguments if self.option is set as True
	if tcp.option:
		sys.argv.remove("-s")
	
	for argv in sys.argv[1:]: #name of python file is exclusive
		parts = argv.split(".")
		if len(parts) == 2: #It is reasonable that when one of the arguments is splitted with dot, the one having the size of 2 would be a file name.
			if tcp.check_filename(parts) == True:
				sys.argv.remove(argv)
		elif tcp.check_ips(parts) == False: #If a format of IP is invalid, terminates the program with an error message
			print(argv, " is an invalid IP address")
			exit()
	#If exception gets caught, terminates the program with an error message
	if tcp.parse_file(tcp.file_name) == False:
		print("FileNotFoundError occurred")
		exit()
		
	tcp.print_list()