import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import filterIcon from '../assets/icon_filter@2x.png';
import searchIcon from '../assets/icon_search@2x.png';

interface OrderData {
  id: string;
  name: string;
  type: string;
  contact: string;
}

const mockData: OrderData[] = [
  { id: "001", name: "整数001", type: "AAAA", contact: "10887388928" },
  { id: "002", name: "整数002", type: "BBBB", contact: "10887388928" },
  { id: "003", name: "整数003", type: "CCCC", contact: "10887388928" },
  { id: "004", name: "整数004", type: "DDDD", contact: "10887388928" },
];

const typeOptions = ["AAAA", "BBBB", "CCCC", "DDDD"];

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState<boolean>(false);

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    }
  };

  const filteredData = mockData.filter(item => {
    const hasItem = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const hasType = selectedTypes.length === 0 || selectedTypes.includes(item.type);
    return hasItem && hasType;
  });

  return (
    <div className="w-app h-app bg-background border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-4 border-border">
        <h1 className="pb-4 text-xl font-medium text-foreground border-b">Title</h1>
      </div>

      {/* Tabs */}
      <div className="px-6">

        {/* Content Navigator */}
        <Tabs defaultValue="statistics" className="w-full">
          <TabsList className="grid w-fit grid-cols-2 bg-transparent border-b border-border rounded-none h-12 p-0">
            <TabsTrigger
              value="statistics"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none px-4 py-3"
            >
              订单统计
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none px-4 py-3"
            >
              订单列表
            </TabsTrigger>
          </TabsList>

          {/* Statistic Content */}
          <TabsContent value="statistics" className="mt-0">
            <div className="py-6">

              {/* Table */}
              <div className="border border-border rounded-lg overflow-hidden">
                
                {/* Table Header */}
                <div className="grid grid-cols-3 bg-table-header border-b border-table-border">
                  <div className="p-4 text-sm font-medium text-foreground">
                    名称
                  </div>
                  <div className="p-4 text-sm font-medium text-foreground border-l border-table-border relative text-center">
                    类型
                    <DropdownMenu open={isTypeFilterOpen} onOpenChange={setIsTypeFilterOpen} >
                      <DropdownMenuTrigger asChild>
                        <button
                          className="absolute mx-2 inline hover:bg-accent"
                        >
                          <img src={filterIcon} alt="category filter icon" className="h-5 w-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-56 bg-popover border border-border rounded-lg p-3 shadow-lg z-50" 
                        style={{marginLeft: '-4rem'}}  
                        align="center"
                      >
                        <div className="space-y-3">
                          <div className="relative">
                            <img src={searchIcon} className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                              type='text'
                              className="flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-9 bg-input border-border text-foreground"
                              onChange={(e) => setSearchTerm(e.target.value)}
                              placeholder="搜索"
                              value={searchTerm}
                            />
                          </div>
                          <div className="space-y-2">
                            {typeOptions.map((type) => (
                              <div key={type} className="flex items-center space-x-2">
                                <Checkbox
                                  id={type}
                                  checked={selectedTypes.includes(type)}
                                  onCheckedChange={(checked) =>
                                    handleTypeChange(type, checked as boolean)
                                  }
                                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                                <label
                                  htmlFor={type}
                                  className="text-sm text-foreground cursor-pointer"
                                >
                                  {type}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="p-4 text-sm font-medium text-foreground border-l border-table-border relative text-center">
                    联系方式
                    <div className="absolute mx-2 inline hover:bg-accent">
                      <img src={filterIcon} alt="contacts filter icon" className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-table-border">
                  {filteredData.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-3 hover:bg-table-hover transition-colors"
                    >
                      <div className="px-4 py-3 text-sm text-foreground">
                        {item.name}
                      </div>
                      <div className="px-4 py-3 text-sm text-foreground text-center border-l border-table-border">
                        {item.type}
                      </div>
                      <div className="px-4 py-3 text-sm text-foreground text-center border-l border-table-border">
                        {item.contact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Lists Content */}
          <TabsContent value="list" className="mt-0">
            <div className="py-6">
              <div className="text-center text-muted-foreground">
                订单列表内容
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}