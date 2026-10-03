import MovieCard from "@/app/components/movie-card";
import SectionHeader from "@/app/components/section-header";
import { ScrollView, View } from "react-native";


export default function HomeScreen () {
    return (
      <ScrollView>

        <View style={{flex: 1}}>
           <View style={{marginVertical: 20}}>
            <SectionHeader title={"Top picks"}></SectionHeader>
            <MovieCard/>
          </View>

          

  
        </View>

        </ScrollView>
    )
}


