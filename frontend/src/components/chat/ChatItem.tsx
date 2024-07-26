import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GetInitials } from "../../helpers/get-initial";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
  return [message]; //If no code blocks, return the entire message as a single block
}
function isCodeBlock(str: string) {
  return (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("=>") ||
    str.includes("<>") ||
    str.includes("[") ||
    str.includes("//") ||
    str.includes("|")
  );
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const auth = useAuth();
  const messageBlocks = extractCodeFromString(content);
  const getInitials = GetInitials(auth?.user?.name!);

  return role == "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        my: 1,
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar
        sx={{
          ml: "0",
          bgcolor: "black",
          border: 1,
          borderColor: "grey",
        }}
      >
        <img src="openai2.png" alt="OpenAI" width={"30px"}></img>
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language="typescript"
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={index} sx={{ fontSize: "20px" }}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {getInitials}
      </Avatar>
      <Box>
        <Typography color={"white"} fontSize={"20px"}>
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
