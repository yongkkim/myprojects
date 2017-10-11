from itertools import islice
import sys
import re
class tcpdump:
	def __init__(self):
		self.source_ip = None
		self.destin_ip = None
		self.option = None
		self.file_name = None
		self.ip_addresses = []
		self.packet_size = 0
		self.num_ip = 0
	def check_ips(self, parts):
		for part in parts:
			try:
				if eval(part) < 0 or eval(part) > 255:
					return False
			except:
				return False
					
		if self.num_ip == 0:
			self.source_ip = parts[0] + "." + parts[1] + "." + parts[2] + "." + parts[3]
			self.num_ip = self.num_ip + 1
		elif self.num_ip == 1:
			self.destin_ip = parts[0] + "." + parts[1] + "." + parts[2] + "." + parts[3]
			self.num_ip = self.num_ip + 1
		elif self.num_ip == 2:
			print("You already have a source and destination IP address")
		return True

	def check_options(self, option):
		if "-s" in option:
			self.option = True
		else:
			self.option = False
			
	def parse_file(self, file_name):
		try :
			case_for_two = False
			ips = []
			ip = []
			match =[]
			file_object = open(self.file_name,"r")
			information = file_object.readlines()
			file_object.close()
			for line in information:
					for i in islice(re.finditer(r'[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}', line), 2):
						ip.append((i.group()))
					mixed = re.findall(r'\blength\s[0-9]+', line)
					if len(mixed) == 0:
						length = 0
					else:
						getLength = mixed[0].split(" ");
						length = getLength[1]
					
					if ip:
						ip.append(int(length))
						ips.append(ip)
					ip = []
					
			if self.source_ip != None:
				for ip in ips:
					check_exist = False
					if ip:
						if self.destin_ip != None and len(ip) == 3:
							if self.source_ip in ip[0] and self.destin_ip in ip[1]:
								if self.ip_addresses:
									self.ip_addresses[0][-1] = self.ip_addresses[0][-1] + ip[-1]
								else:
									self.ip_addresses.append(ip)
								
								self.packet_size = self.packet_size + ip[-1]
						elif self.source_ip in ip[0]:
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
			else:
				for ip in ips:
					check_exist = False
					if ip:
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
		for index in range(len(self.ip_addresses)-1,-1,-1):
			indexMax=0
			for index2 in range(0,index):
				if self.ip_addresses[index2][-1] > self.ip_addresses[indexMax][-1]:
				   indexMax = index2

			temp = self.ip_addresses[index]
			self.ip_addresses[index] = self.ip_addresses[indexMax]
			self.ip_addresses[indexMax] = temp

if len(sys.argv) == 1:
    print("There is no command line argument")
else:
	tcp = tcpdump()
	valid = True
	tcp.check_options(sys.argv)
	if tcp.option:
		sys.argv.remove("-s")
	
	for argv in sys.argv[1:]:
		parts = argv.split(".")
		if "txt" in parts and len(parts) == 2:
			tcp.file_name = parts[0] + "." + parts[1]
		elif tcp.check_ips(parts) == False:
			print(argv, " is an invalid IP address")
			exit()
	
	if tcp.parse_file(tcp.file_name) == False:
		print("FileNotFoundError occurred")
		exit()
		
	if tcp.option == True:
		tcp.sort_list()
	
	for i in tcp.ip_addresses:
		if len(i) == 2:
			print("source:", i[0], "\ttotal:", str(i[-1]))
		else:
			print("source:", i[0], "\tdest:", i[1], "\ttotal:", str(i[-1]))
	#sfile.close()
	#print(tcp.source_ip, "\n", tcp.destin_ip, "\n", tcp.option, "\n", tcp.file_name, "\n", tcp.packet_size)