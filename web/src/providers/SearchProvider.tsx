import React, { createContext, useMemo, useState } from 'react';

export const searchContext = createContext({
    searchData: '',
    handleSearchData: (data:string) => {}
}) 

interface SearchProviderProps {
    children: React.ReactNode;
}

export const SearchProvider:React.FC<SearchProviderProps> = (props: SearchProviderProps) => {

    const { children } = props;
    const [searchData, setSearchData] = useState<string>('');
    
    const value = useMemo(() => {
        const handleSearchData = (data: string) => {
            console.log('settingData ...')
            setSearchData(data);
          };
        return {
            searchData,
            handleSearchData
        }
    }, [searchData])

    return (
        <searchContext.Provider value={value}>
            {children}
        </searchContext.Provider>
    )
}