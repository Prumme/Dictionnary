import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./components/ui/drawer";
import { Input } from "./components/ui/input";
import { Skeleton } from "./components/ui/skeleton";
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
} from "./components/ui/alert-dialog";

function App() {
  let [open, setOpen] = useState(false);
  let [search, setSearch] = useState("");
  let [darkMode, setDarkMode] = useState(false);
  let [loading, setLoading] = useState(false);

  let [definition, setDefinition] = useState([]);

  let [error, setError] = useState("");
  let [available, setAvailable] = useState(true);

  let onChangeSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      setAvailable(false);
    } else {
      setAvailable(true);
    }
  };

  let onSearch = () => {
    setLoading(true);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`).then(
      (response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            setDefinition(data);
            setLoading(false);
            setOpen(true);
          });
        } else {
          setDefinition([]);
          setError("Word not found");
          setLoading(false);
        }
      }
    );
  };

  let onChangeDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  let onRemoveWord = () => {
    setError("");
    setDefinition([]);
    setSearch("");
  };

  return (
    <Drawer
      open={open && (loading || definition.length > 0)}
      onOpenChange={setOpen}
    >
      <AlertDialog open={error}>
        <div className="relative h-screen w-screen">
          <div className="absolute right-5 top-4 flex space-x-2 items-center">
            <Switch
              checked={darkMode}
              id="darkMode-switch"
              onClick={() => onChangeDarkMode()}
            />
            <Label htmlFor="darkMode-switch">Dark Mode</Label>
          </div>
          <div class="h-1/2 flex justify-center items-center">
            <div className="w-1/2 flex space-x-2">
              <Input
                id="search"
                type="search"
                placeholder="Insert the word you search"
                autocomplete="off"
                value={search}
                onChange={(e) => onChangeSearch(e)}
              />
              <DrawerTrigger asChild>
                <Button disabled={available} onClick={() => onSearch()}>
                  Search
                </Button>
              </DrawerTrigger>
            </div>
          </div>
        </div>

        <DrawerContent>
          <div className="mx-auto w-full max-w-4xl min-h-[28rem] max-h-[80vh] overflow-y-scroll no-scrollbar">
            <DrawerHeader>
              <DrawerTitle className="capitalize text-4xl">
                {loading ? "Definition" : search}
              </DrawerTitle>
            </DrawerHeader>

            {loading ? (
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              definition.map((item, index) => {
                return (
                  <div
                    className="flex flex-col space-y-2"
                    key={"item-" + index}
                  >
                    <div className="flex space-x-3 text-lg mt-3 font-bold">
                      <p className="capitalize">{item.word}:</p>
                      <p className="text-slate-400 italic">{item.phonetic}</p>
                    </div>

                    {item.meanings.map((meaning, index) => {
                      return (
                        <div className="space-y-4" key={"meaning-" + index}>
                          <p className="capitalize font-semibold">
                            {meaning.partOfSpeech}
                          </p>
                          {meaning.definitions.map((definition, index) => {
                            return (
                              <div
                                className="space-y-2"
                                key={"definition-" + index}
                              >
                                <div class="flex space-x-2">
                                  <p>Definition: </p>
                                  <p className="">{definition.definition}</p>
                                </div>
                                <div className="flex space-x-2">
                                  <p>Exemple:</p>
                                  <p className="text-slate-600 italic">
                                    {definition.example
                                      ? definition.example
                                      : "No example"}
                                  </p>
                                </div>
                                <hr className="border-b-2 border-slate-200" />
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>
        </DrawerContent>

        <AlertDialogContent>
          The inserted word has no definition
          <AlertDialogCancel onClick={() => onRemoveWord()}>
            Cancel
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </Drawer>
  );
}

export default App;
