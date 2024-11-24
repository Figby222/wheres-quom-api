-- CreateTable
CREATE TABLE "_CharactersFoundInGame" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CharactersFoundInGame_AB_unique" ON "_CharactersFoundInGame"("A", "B");

-- CreateIndex
CREATE INDEX "_CharactersFoundInGame_B_index" ON "_CharactersFoundInGame"("B");

-- AddForeignKey
ALTER TABLE "_CharactersFoundInGame" ADD CONSTRAINT "_CharactersFoundInGame_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharactersFoundInGame" ADD CONSTRAINT "_CharactersFoundInGame_B_fkey" FOREIGN KEY ("B") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
